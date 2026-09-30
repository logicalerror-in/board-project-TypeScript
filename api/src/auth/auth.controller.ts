import {Body, Controller, Get, Post, Req, UnauthorizedException} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import type {Request} from "express";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  login(@Body() loginDto: LoginDto, @Req() request: Request) {
    const user = this.authService.login(loginDto.id, loginDto.password);

    request.session.user = user;

    return user;
  }

  @Get('me')
  me(@Req() request: Request) {
    const user = request.session.user;
    if (user === undefined) {
      throw new UnauthorizedException('로그인이 필요합니다.');
    }

    return user;
  }

  @Post('logout')
  logout(@Req() request: Request) {
    return new Promise<{ message: string; }>((resolve, reject) => {
      request.session.destroy((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve({message: '로그아웃되었습니다.'});
      });
    });
  }

}