import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
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
      throw new Error('Credenciais invalidas');
    }
    return this.authService.login(user);
  }

  @Post('protected')
  @ApiOperation({ summary: 'Acessar rota protegida com token JWT' })
  @ApiBearerAuth() 
  @UseGuards(JwtAuthGuard)
  getProtected(@Request() req) {
    return { message: 'Voce esta conectado', user: req.user };
  }
}
