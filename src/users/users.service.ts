import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    { id: 1, username: 'user', password: '$2b$10$...' },
  ];

  async findByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
