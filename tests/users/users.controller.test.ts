import * as Configs from "../../src/configurations";
import * as Server from "../../src/server";
import * as Database from "../../src/database";

const configDb = Configs.getDatabaseConfig();
const database = Database.init(configDb);
const serverConfig = Configs.getServerConfigs();

describe("UserController Tests", () => {
  let server: any;

  beforeAll(done => {
    process.env.NODE_ENV = 'test';
    Server.init(serverConfig, database).then(s => {
      server = s;
      done();
    });
  });

  it("Create user", async () => {
    var user = {
      name: "John Robot",
    };

    const res = await server.inject({
      method: "POST",
      url: "/users",
      payload: user
    });

    const responseBody = JSON.parse(res.payload);
    expect(res.statusCode).toEqual(201);
    expect(responseBody.name).toEqual(user.name);
  });

  it("Create user invalid data", async () => {
    var user = {
      // name: "John Robot"
    };

    const res = await server.inject({
      method: "POST",
      url: "/users",
      payload: user
    });
    expect(res.statusCode).toEqual(400);
  });
});
