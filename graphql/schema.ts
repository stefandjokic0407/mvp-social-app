import 'reflect-metadata';
import { makeExecutableSchema } from '@graphql-tools/schema';

import {
  TotymCrudResolver,
  TotymRelationsResolver,
  UserCrudResolver,
  UserRelationsResolver,
  RequestAndSharedCrudResolver,
  RequestAndSharedRelationsResolver,
  RequestAndSharedUserRelationsResolver,
  RequestAndSharedUserCrudResolver,
  RequestAndSharedUser,
  RequestAndShared,
  RequestAndSharedCreateInput,
  CollectionCrudResolver,
  CollectionRelationsResolver,
  ItemCrudResolver,
  ItemRelationsResolver,
  CommentCrudResolver,
  CommentRelationsResolver,
} from './generated/type-graphql';

import {
  Resolver,
  Arg,
  Subscription,
  Mutation,
  PubSub,
  Root,
  buildTypeDefsAndResolvers,
  Ctx,
} from 'type-graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import { Context } from '@apollo/client';
@Resolver((of) => RequestAndSharedUser)
export class SubscriptionResolver {
  @Mutation(() => RequestAndShared)
  async requestToUsers(
    @PubSub() pubSub: PubSubEngine,
    @Arg('data') newData: RequestAndSharedCreateInput,
    @Ctx() ctx: Context
  ): Promise<RequestAndShared> {
    const res = await ctx.prisma.requestAndShared.create({
      data: { ...newData },
    });
    const payload = await ctx.prisma.requestAndSharedUser.findMany({
      where: { notificationId: res.id },
    });
    await pubSub.publish('notification', { ...payload });
    return res;
  }

  @Subscription(() => RequestAndSharedUser, {
    topics: 'notification',
  })
  notification(
    @Root() data: RequestAndSharedUser,
    @Arg('userId') userId: number
  ): RequestAndSharedUser {
    const res = { ...data };
    let returns = { id: 1, read: false, userId: 0, notificationId: 0 };
    for (let key of Object.keys(res)) {
      if (userId == res[key].userId) {
        return res[key];
      }
    }
    return returns;
  }
}

export const schema = async () => {
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [
      UserRelationsResolver,
      UserCrudResolver,
      TotymRelationsResolver,
      TotymCrudResolver,
      RequestAndSharedRelationsResolver,
      RequestAndSharedCrudResolver,
      RequestAndSharedUserRelationsResolver,
      RequestAndSharedUserCrudResolver,
      CollectionCrudResolver,
      CollectionRelationsResolver,
      ItemCrudResolver,
      ItemRelationsResolver,
      SubscriptionResolver,
      CommentCrudResolver,
      CommentRelationsResolver,
    ],
    // emitSchemaFile: "./generated-schema.graphql",
    validate: false,
  });
  return makeExecutableSchema({ typeDefs, resolvers: resolvers });
};
