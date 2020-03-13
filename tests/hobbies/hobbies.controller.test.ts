import * as Configs from "../../src/configurations";
import * as Server from "../../src/server";
import * as Database from "../../src/database";

const configDb = Configs.getDatabaseConfig();
const database = Database.init(configDb);
const serverConfig = Configs.getServerConfigs();

describe("HobbyController Tests", () => {
  let server: any = null;

  beforeAll(done => {
    process.env.NODE_ENV = 'test';
    Server.init(serverConfig, database).then(s => {
      server = s;
      done();
    });
  });

  it("Delete Hobby", async () => {
    var user = {
      name: "John Robot",
    };
    const userRes = await server.inject({
      method: "POST",
      url: "/users",
      payload: user
    });
    const savedUser = JSON.parse(userRes.payload);
    expect(userRes.statusCode).toEqual(201);

    var hobby = {
      name: "Woodworking",
      passionLevel: "Low",
      year: 2,
      user: savedUser._id
    };
    const hobbyRes = await server.inject({
      method: "POST",
      url: "/hobbies",
      payload: hobby
    });
    const savedHobby = JSON.parse(hobbyRes.payload);
    expect(hobbyRes.statusCode).toEqual(201);

    const userHobbyBeforeRes = await server.inject({
      method: "GET",
      url: "/hobbies?userId=" + savedUser._id,
    });
    const userHobbies = JSON.parse(userHobbyBeforeRes.payload).filter((hobby: { _id: any; }) => hobby._id === savedHobby._id);
    expect(userHobbies.length).toEqual(1);

    const hobbyDeleteRes = await server.inject({
      method: "DELETE",
      url: "/hobbies/" + savedHobby._id,
    });
    expect(hobbyDeleteRes.statusCode).toEqual(200);

    const userHobbyAfterRes = await server.inject({
      method: "GET",
      url: "/hobbies?userId=" + savedUser._id,
    });
    const userHobbiesAfterDelete = JSON.parse(userHobbyAfterRes.payload).filter((hobby: { _id: any; }) => hobby._id === savedHobby._id);
    expect(userHobbiesAfterDelete.length).toEqual(0);
  });

  it("Get hobbies without userId", async () => {

    const res = await server.inject({
      method: "GET",
      url: "/hobbies"
    });
    expect(res.statusCode).toEqual(400);
  });
});
