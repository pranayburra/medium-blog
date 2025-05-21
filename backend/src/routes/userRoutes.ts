import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { Hono } from "hono";
import {signupInput,signinInput} from "@pranayburra007/medium-common"
import { verify } from "hono/jwt";
const users = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();


users.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success}=signupInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Inputs are incorrect"
        })
    }
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                password: body.password
            }
        });
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({
            jwt: token
        })
    } catch (e) {
        return c.status(403);
    }
})

users.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const {success}=signinInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Inputs are incorrect"
        })
    }
    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    });

    if (!user) {
        c.status(403);
        return c.json({
            "error": "user not found"
        });
    }


    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)


    return c.json({
        jwt
    })
})
users.get('/me',async (c)=>{
     const header=c.req.header("Authorization")||"";
        const token=header.split(" ")[1]; 
        try{
          const response=await verify(token,c.env.JWT_SECRET);
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
      
        if(response.id){

        const id=String(response.id)
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        email: true,
        blogs: {
          select: {
            id: true,
            title: true,
            content: true,
            published: true,
            createdAt:true,
          },
        },
      },
    });
    if(!user){
        return c.json({error:"user not found"})
    }
    return c.json(user)
     
         
    }
    }catch(err){
         console.error("Error in /me route:", err);
    c.status(500);
    return c.json({ error: "Internal Server Error" });
    }
       
})

export default users;