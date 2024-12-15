import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaService } from "src/prisma.service";
import { JwtStrategy } from "./jwt.strategy";
import { UsersService } from "src/Users/users.service";
import { UsersModules } from "src/Users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

@Module({
   controllers: [AuthController],
   providers: [
     AuthService,
     PrismaService,
     JwtStrategy, // Corregido a JwtStrategy
     UsersService
   ],
   imports: [
      UsersModules , // Corregido a UsersModule
     PassportModule,
     JwtModule.register({
       secret: process.env.JWT_SECRET, 
       signOptions: {
         expiresIn: process.env.JWT_EXPRIRE_IN 
       }
     })
   ],
   
 })
export class AuthModule{}