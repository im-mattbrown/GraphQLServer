import { Resolver, Ctx, Query } from "type-graphql"
import { User } from "../../entity/User";
import { MyContext } from "src/types/MyContext";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      console.log("req.session userId not found");
      return undefined;
    }
    console.log("user found!")
    return User.findOne(ctx.req.session!.userId)
  }
}
