import { z } from "zod";

const blogSchema = z.object({
    title:z
    .string({required_error:"title is required"})
    .trim()
    .min(2,{message:"title must be of atleast 2 characters."})
    .max(1000,{message:"title must not be greater than 1000 characters"}),
    username: z
    .string({required_error:"username is required"})
    .trim()
    .min(3,{message:"username must be of atleast 3 characters."})
    .max(255,{message:"username must not be greater than 255 characters."}),
    summary: z.
    string({required_error:"summary is required"})
    .min(100,{message:"summary must be of atleast 100 characters."}),
    blog:z.
    string({required_error:"blog content is required"})
    .min(1000,{message:"blog content must be of atleast 1000 characters."}),
    email: z
    .string({required_error:"email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(3,{message:"email must be of atleast 3 characters."})
    .max(255,{message:"email must not be greater than 255 characters."}),
});


export default blogSchema;
