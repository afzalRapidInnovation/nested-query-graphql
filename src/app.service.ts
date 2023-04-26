import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  FriendsCollectionName,
  FriendsDocument,
  FriendsSchema,
  Users,
  UsersDocument,
} from './schema/schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
    @InjectModel(FriendsSchema.name)
    private friendModel: Model<FriendsDocument>,
  ) {}

  async getHello() {
    // console.log(await this.userModel.find({}));
    // console.log(await this.friendModel.find({}));
    // return await this.userModel.find({}).populate({
    //   path: 'friends',
    //   model: FriendsCollectionName,
    // });
    return await this.userModel.find({}).populate('friends.friendId').limit(10);
  }
}
