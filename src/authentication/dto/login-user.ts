import {IsString,IsEmail, IsNumber} from 'class-validator'

export class LoginDto{
    
 @IsNumber() 
 id :number 

 @IsString({message:'el nombre no existe'})  
 name:string;

 @IsEmail({},{message:'el correo electronico no existe'}) 
 email: string 

 @IsString() 
 password:string;
}