import * as Hapi from "hapi";
import * as Boom from "boom";
import { IUser } from "../models/user.model";
import { IDatabase } from "../../../database";
import { IServerConfigurations } from "../../../configurations";
import { IRequest } from "../../../interfaces/request";

export default class UserController {
  private database: IDatabase;
  private configs: IServerConfigurations;

  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.database = database;
    this.configs = configs;
  }

  public async createUser(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      let user: any = await this.database.userModel.create(request.payload);
      return h.response(user).code(201);
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

  // public async getUser(request: IRequest, h: Hapi.ResponseToolkit) {
  //   try {
  //     let user: IUser = await this.database.userModel.findById(request.params.userId).where({ isDeleted: false }).populate('hobbies');
  //     if (user == null) {
  //       return Boom.notFound();
  //     }
  //     return user;
  //   } catch (error) {
  //     return Boom.badImplementation(error);
  //   }
  // }

  public async listUser(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      let users: Array<any> = await this.database.userModel.find({ isDeleted: false });
      return users;
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

  public async deleteUser(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      let user: IUser | null = await this.database.userModel.findByIdAndUpdate(
        request.params.userId,
        { isDeleted: true },
        { new: true }
      );
      return user;
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

}
