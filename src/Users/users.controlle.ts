import { Controller, Get, Req, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import  {Response , Request} from'express'



@Controller('users')
export class UsersController {
   constructor(
      private  readonly  usersService: UsersService
   ){}
     

   @Get()
   async getAllUsers(@Req() request:Request ,@Res() response:Response):Promise<any>{
     try {
      const result = await this.usersService.getAllUsers();
      return  response.status(200).json({
         status:'OK',
         menssage: 'Success',
         result: result
      })
      
     } catch (error) {
      return response.status(500).json({
         status: 'ok',
         message: 'error de la server '
      })
     }
   }
}