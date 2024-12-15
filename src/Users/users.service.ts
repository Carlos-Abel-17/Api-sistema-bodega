import { ConflictException, Injectable } from "@nestjs/common";
import { Users } from "@prisma/client";
import { PrismaService } from "src/prisma.service";




@Injectable()
export class UsersService {
  constructor(
   private prisma: PrismaService
  ){}
  
  async getAllUsers (): Promise<Users[]>{
   return this.prisma.users.findMany()
  }

  async CreateUsers(data: Users): Promise<Users> {
   const existing = await this.prisma.users.findFirst({
     where: {
       email: data.email,
     },
   });

   // Lanzar la excepción si el usuario ya existe
   if (existing) {
     throw new ConflictException('The email already exists');
   }

   // Crear el usuario si no existe
   return this.prisma.users.create({
     data,
   });
 }
}