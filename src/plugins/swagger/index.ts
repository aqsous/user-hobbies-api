import { IPlugin, IPluginInfo } from "../interfaces";
import * as Hapi from "hapi";


const register = async (server: Hapi.Server): Promise<void> => {
  try {
    return server.register([
      require('inert'),
      require('vision'),
      {
        plugin: require('hapi-swagger'),
        options: {
          info: {
            title: "User Hobbies Api",
            description: "User Hobbies Api Documentation",
            version: "0.0.1"
          },
          tags: [
            {
              name: "hobbies",
              description: "Api hobbies interface."
            },
            {
              name: "users",
              description: "Api users interface."
            }
          ],
          swaggerUI: false,
          documentationPage: true,
          documentationPath: "/"
        }
      }
    ]);
  } catch (err) {
    console.log(`Error registering swagger plugin: ${err}`);
  }
};

export default (): IPlugin => {
  return {
    register,
    info: () => {
      return { name: "Swagger Documentation", version: "1.0.0" };
    }
  };
};
