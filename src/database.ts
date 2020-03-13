import Mongoose = require('mongoose');
import { IDataConfiguration } from "./configurations";
import { IUser, UserModel } from "./api/v1/models/user.model";
import { IHobby, HobbyModel } from "./api/v1/models/hobby.model";

export interface IDatabase {
  userModel: Mongoose.Model<IUser>;
  hobbyModel: Mongoose.Model<IHobby>;
}

export function init(config: IDataConfiguration): IDatabase {
  (<any>Mongoose).Promise = Promise;

  Mongoose.connect(process.env.MONGO_URI || config.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let mongoDb = Mongoose.connection;

  mongoDb.on("error", () => {
    console.log(`Unable to connect to database: ${config.connectionString}`);
  });

  mongoDb.once("open", () => {
    console.log(`Connected to database: ${config.connectionString}`);
  });

  return {
    userModel: UserModel,
    hobbyModel: HobbyModel
  };
}
