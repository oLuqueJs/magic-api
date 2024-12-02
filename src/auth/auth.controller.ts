import { Controller, Post, Body, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realizar login e obter token JWT' })
  @ApiBody({
    description: 'Credenciais para autenticação',
    schema: {
      example: {
        username: 'user',
        password: 'password',
      },
    },
  })
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiBody({
    description: 'Dados para registro',
    schema: {
      example: {
        username: 'newuser',
        password: 'newpassword',
      },
    },
  })
  async register(@Body() body: { username: string; password: string }) {
    const newUser = await this.authService.register(body.username, body.password);
    return { message: 'Usuário registrado com sucesso', user: newUser };
  }

  @Post('protected')
  @ApiOperation({ summary: 'Acessar rota protegida com token JWT' })
  @ApiBearerAuth() 
  @UseGuards(JwtAuthGuard)
  getProtected(@Request() req) {
    return { message: 'Você está conectado', user: req.user };
  }
}
