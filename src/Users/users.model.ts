import { Prisma } from "@prisma/client";


export class  Users implements Prisma.UsersCreateInput{
   name: string;
   password: string;
   email: string;
}