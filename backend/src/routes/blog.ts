import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {createblog,updateblog} from "@pranayburra007/medium-common"
import { use } from "hono/jsx";
 const blogrouter = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET:string
  },
  Variables:{
    userId:string,

  }
}>();
blogrouter.use('/*',async  (c,next)=>{
    const header=c.req.header("Authorization")||"";
    const token=header.split(" ")[1]; 

    const response=await verify(token,c.env.JWT_SECRET);
    if(response.id){
      c.set("userId",String(response.id));
      await next();
    }
    else{
      c.status(403);
      return c.json({error:"unauthorized"});

    }
    
})



blogrouter.post('/',async (c) => {
    const body=await c.req.json();
    const userId= c.get("userId");
    const {success}=createblog.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Inputs are incorrect"
        })
    }
    const authorId=c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blog= await prisma.blog.create({
    data:{
      title:body.title,
      content:body.content,
      authorId:userId

    }
  })
	return c.json({
    blog
  })
})

  blogrouter.put('/', async (c) => {
    const userId= c.get("userId");
    const prisma=new PrismaClient({
      datasourceUrl:c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body=await c.req.json();
   
    const {success}=updateblog.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Inputs are incorrect"
        })
    }
    const updatedBlog = await prisma.blog.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });


    return c.json(updatedBlog)
  });
blogrouter.get('/bulk',async(c) => {
  const userId=c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());

  const blogs=await prisma.blog.findMany({
   
    select:{
      content:true,
      title:true, 
      id:true,
      createdAt:true,
      author:{
        select:{    
          name:true
        } 
    }
  }
});

  return c.json({
    blogs
  })

}) 

blogrouter.get('/personal/bulk',async (c)=>{
  const userId=c.get("userId");
 const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
  try{
    const blogs=await prisma.blog.findMany({
      where:{
        authorId:userId,
      },
      select:{
        title:true,
        content:true,
        id:true,
        createdAt:true,
        author:{
          select:{
            name:true,
          }
        }

      }
    })
    return c.json({
      blogs
    }
      
    )
  }catch(err){
    return console.error('Error fetching blogs:', err);
  }

})
blogrouter.get('/:id',async (c) => {
	

  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
  const id = Number(c.req.param('id'));
  const post = await prisma.blog.findUnique({
		where: {
			id
		},
    select:{
      content:true,
      title:true, 
      id:true,
      createdAt:true,
      author:{
        select:{
          name:true,
         
        }
      }
    
    }
	});
  
  
	return c.json(post)
})
blogrouter.get('/search/:title', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Get the title from query parameters
 
 const title = c.req.param('title')
  if (!title) {
    return c.json({ error: 'Title query parameter is required.' }, 400);
  }

  try {
    const posts = await prisma.blog.findMany({
      where: {
        title: {
          contains: title,  // Case-insensitive search
          mode: 'insensitive',  // Insensitive search
        },
      },
      select: {
        content: true,
        id: true,
        title: true,
        published: true,
        createdAt:true,
        author: {
          select: {
            name: true,
            
          },
        },
      },
    });

    if (posts.length === 0) {
      return c.json({ message: 'No blogs found matching the given title.' }, 404);
    }

    return c.json(posts);  // Return matching blogs
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

export default blogrouter;