import Mongoose = require('mongoose');
import { IDataConfiguration } from "./configurations";

export interface IDatabase {
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
  };
}
