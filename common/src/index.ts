import {z} from "zod";

export const signupInput=z.object({
    email:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
})



export const signinInput=z.object({
    email:z.string().email(),
    password:z.string().min(6)
})



export const createblog=z.object({
    title:z.string(),
    content:z.string(),
    
})


export const updateblog=z.object({
    title:z.string(),
    content:z.string(),
    id:z.number()
})




export type SignupInput=z.infer<typeof signupInput>
export type SigninInput=z.infer<typeof signinInput>
export type Createblog=z.infer<typeof createblog>
export type Updateblog=z.infer<typeof updateblog>

