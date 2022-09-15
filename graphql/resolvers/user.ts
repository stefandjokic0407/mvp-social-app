import "reflect-metadata";
import { Resolver, Query, Ctx } from "type-graphql";
import prisma from "../../prisma/client";
import { UserCrudResolver, User } from "../generated/type-graphql";

@Resolver(User)
class CustomUserResolver {
  @Query((returns) => User)
  async Viewer(@Ctx() ctx: { prisma: typeof prisma }) {
    const result = await ctx.prisma.user.findMany();
    return result[0];
  }
}

export default [UserCrudResolver, CustomUserResolver];
