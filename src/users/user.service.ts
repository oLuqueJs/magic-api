import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { RmqService } from '../rmq/rmq.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly rmqService: RmqService,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    await createdUser.save();
    await this.rmqService.sendToQueue('user_create_queue', { username: user.username }, 5);
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, user: User): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
    await this.rmqService.sendToQueue('user_update_queue', { username: updatedUser.username }, 5);
    return updatedUser;
  }

  async delete(id: string): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    await this.rmqService.sendToQueue('user_delete_queue', { username: deletedUser.username }, 5);
    return deletedUser;
  }
}
