import { Injectable } from '@nestjs/common';
import { User } from './user.entity'; 

@Injectable()
export class UserService {
  private readonly users: User[] = [
    { id: 1, username: 'testuser', password: 'hashedpassword123' },
  ]; 

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
