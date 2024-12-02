import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service'; 
import { User } from '../users/user.entity'; 

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  
    Valida 
    @param username 
    @param password 
    @returns 
   
  async validateUser(username: string, password: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findOne(username);
    if (!user) {
      return null;
    }

    const bcrypt = await import('bcrypt');
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (isPasswordValid) {
      const { password, ...result } = user; 
      return result;
    }

    return null;
  }

    @param user 
    @returns 
  
  async login(user: Omit<User, 'password'>) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, password: string): Promise<Omit<User, 'password'>> {
    const bcrypt = await import('bcrypt');
    const hashedPassword = bcrypt.hashSync(password, 10); 

    const newUser = await this.userService.create({
      username,
      password: hashedPassword,
    });

    const { password: _, ...result } = newUser; 
    return result;
  }
}
