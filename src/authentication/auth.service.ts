import {Injectable, NotFoundException} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/Users/users.service';
import {JwtService} from '@nestjs/jwt';
import { LoginDto } from './dto/login-user';
import *as bcrypt from 'bcrypt'
import { RegisterUserDto } from './dto/register-user.dto';
import { Users } from 'src/Users/users.model';
import { CLIENT_RENEG_LIMIT } from 'tls';



@Injectable()
export class AuthService{
 constructor (
   private readonly prismaService:PrismaService,
   private  readonly jwtService:JwtService,
   private readonly usersService:UsersService

 ){}


 async  login (logiDto:LoginDto):Promise<any>{
   const {email ,password} = logiDto;

   const  users =  await  this.prismaService.users.findFirst(
      {
         where:{email}
      }
   )
   if(!users){
      throw new NotFoundException('users not found')
   }
    
   const validatePassword = await bcrypt.compare(password,users.password)

   if(!validatePassword) {
      throw new NotFoundException('invalid password')
   }

   return {
      token : this.jwtService.sign({email})
   }
 }

 async register(registerDto: RegisterUserDto): Promise<any> {
   // console.log(registerDto)
   // Crear el objeto de usuario con los datos del DTO
   const createUser = {
     id: registerDto.id,  
     name: registerDto.name,
     email: registerDto.email,
     password: await bcrypt.hash(registerDto.password, 10),
     createdAt: new Date(),  
     updatedAt: new Date(), 
   };
 
   // Crear el usuario utilizando el servicio
   const user = await this.usersService.CreateUsers(createUser);
//   console.log(this.jwtService)
   // Retornar el token JWT
   return {
     token: this.jwtService.sign({ email: user.email }),
   // token:'token',
     user: user
   };

}
}  