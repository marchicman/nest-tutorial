import { Body, Controller, ParseIntPipe, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
//    signup(@Body('email') email: string, @Body('password', ParseIntPipe) password: string) {
      signup(@Body() dto: AuthDto) {  
// ParseIntPipe è una pipe di sistema, qui usata solo per far vedere un uso come validatore di input
      
       return this.authService.signup(dto);
    }

    @Post('signin')
    signin() {
        return this.authService.signin();
    }
}