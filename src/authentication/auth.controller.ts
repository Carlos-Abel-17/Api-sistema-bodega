import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-user";
import { Response, Request } from 'express'
import { RegisterUserDto } from "./dto/register-user.dto";






@Controller('/auth')
export class AuthController {

   constructor(private readonly authService: AuthService) { }

   @Post('/login')
   async loguin(
      @Req() request: Request,
      @Res() response: Response,
      @Body() loginDto: LoginDto
   ): Promise<any> {
      try {
         const resultado = await this.authService.login(loginDto)
         if (!resultado) {
            throw new Error('Not Found info Login')
         }
        
         return response.status(200).json(
            {
               status: 'OK',
               message: 'Success Login',
               resul: resultado
            }
         )
      } catch (error) {
         return response.status(400).json(
            {
               message: 'Error logging ',
               status: 'error 500',
               error: error
            }
         )
      }
   }

   @Post('/register')
   async regiter(
      @Req() request: Request,
      @Res() response: Response,
      @Body() registerDto: RegisterUserDto
   ): Promise<any> {
       console.log(registerDto)
      try {
         const resultado = await this.authService.register(registerDto)
         if (!resultado) {
            throw new Error('Not Found info Register')
         }
         return response.status(200).json(
            {
               status: 'OK',
               message: 'Success register',
               resul: resultado
            }
         )
      } catch (error) {
         return response.status(400).json(
            {
               message: 'Error register ',
               status: 'error 500',
               error: error
            }
         )
      }
   }
}