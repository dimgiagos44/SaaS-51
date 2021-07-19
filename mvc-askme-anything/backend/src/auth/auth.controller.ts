import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Render, Request, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  //@Render('home')
  @Post('/login')
  async login(@Request() req, @Res() res) {
    const result = await this.authService.login(req.user);
    if (result.auth === 'fail'){
      req.session.loggedIn = false;
      res.redirect('/landing');
    }
    else{
      req.session.loggedIn = true;
      req.session.userId = req.user.id;
      res.redirect('/home');
    }
  }

  @Render('auth/login')
  @Get('/login')
  logIn(): void {
    return;
  }
  
  @Post('/signup')
  @Render('auth/login')
  async signup(@Body() createUserDto: CreateUserDto, @Res() res) {
    return this.userService.create(createUserDto);
  }

  @Render('auth/signup')
  @Get('/signup')
  signUp(): void {
    return;
  }

  @Render('landing')
  @Get('/logout')
  logOut(@Request() req): void {
    req.session.loggedIn = false;
    return;
  }

}