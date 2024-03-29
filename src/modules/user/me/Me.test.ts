import { Connection } from "typeorm";
import faker from "faker";

import { testConn } from "../../../test-utils/testConnn";
import { gCall } from "../../../test-utils/gCall";
import { User } from "../../../entity/User";

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const meQuery = `
{
 me {
   id
   userName
   email
 } 
}
`;

describe("Me", () => {
  it("get user", async () => {

    const user = await User.create({
      userName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }).save();

    const response = await gCall({
      source: meQuery,
      userId: user.id
    });
    
    console.log(response)
    expect(response).toMatchObject({
      data: {
        me: {
          id: `${user.id}`,
          userName: user.userName,
          email: user.email
        }
      }
    })
  });
});
