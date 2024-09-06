import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(1, { message: "Name isn't required." }),
    role: z.string().min(1, { message: "Role isn't required." }),
    team: z.string().min(1, { message: "Team isn't required." }),
    status: z.coerce.string().min(1, { message: "Status isn't required." }),
    avatar: z.string().url("This is not a valid url."),
    email: z
        .string()
        .min(1, { message: "Email is required." })
        .email("This is not a valid email."),
});
