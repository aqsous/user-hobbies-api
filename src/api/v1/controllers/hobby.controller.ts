import * as Hapi from "hapi";
import * as Boom from "boom";
import { IUser } from "../models/user.model";
import { IHobby } from "../models/hobby.model";
import { IDatabase } from "../../../database";
import { IServerConfigurations } from "../../../configurations";
import { IRequest } from "../../../interfaces/request";

export default class HobbyController {
  private database: IDatabase;
  private configs: IServerConfigurations;

  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.database = database;
    this.configs = configs;
  }

  public async createHobby(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      const userId: string | null = Object(request.payload)['user'];
      const hobby: any = await this.database.hobbyModel.create(request.payload);
      const updateUser = await this.database.userModel.findByIdAndUpdate(userId, {
        $addToSet: {
          hobbies: hobby._id,
        }
      }, { new: true });
      return h.response(hobby).code(201);
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

  public async listUserHobbies(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      const user: IUser | null = await this.database.userModel.findById(request.query.userId).where({ isDeleted: false });
      console.log('user', user);
      if (user == null) {
        return Boom.notFound();
      }
      const hobbies: Array<any> = await this.database.hobbyModel.find({ isDeleted: false, _id: { $in: user.hobbies } });
      return hobbies;
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

  public async deleteUser(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      const hobby: IHobby|null = await this.database.hobbyModel.findById(request.params.hobbyId);
      if (hobby == null) {
        return Boom.notFound();
      }
      const user: IUser | null = await this.database.userModel.updateMany(
        { hobbies: hobby._id },
        { $pull: { hobbies: hobby._id } },
        { new: true }
      );
      const deletedHobby: IHobby | null = await this.database.hobbyModel.findByIdAndUpdate(
        request.params.hobbyId,
        { isDeleted: true },
        { new: true }
      );
      return deletedHobby;
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

}
