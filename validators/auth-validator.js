import { z } from "zod";

const signupSchema = z.object({
    username: z
    .string({required_error:"username is required"})
    .trim()
    .min(3,{message:"username must be of atleast 3 characters."})
    .max(255,{message:"username must not be greater than 255 characters."}),
    password: z
    .string({required_error:"username is required"})
    .min(7,{message:"password must be of atleast 6 characters."})
    .max(1024,{message:"username can't be greater than 1024 characters."}),
    email: z
    .string({required_error:"email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(3,{message:"email must be of atleast 3 characters."})
    .max(255,{message:"email must not be greater than 255 characters."}),
});

const loginSchema = z.object({
    email: z
    .string({required_error:"email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(3,{message:"email must be of atleast 3 characters."})
    .max(255,{message:"email must not be greater than 255 characters."}),
    password: z
    .string({required_error:"password is required"})
    .min(7,{message:"password must be of atleast 6 characters."})
    .max(1024,{message:"password can't be greater than 1024 characters."}),
});

export default {signupSchema,loginSchema};