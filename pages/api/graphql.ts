import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { NextApiRequest, NextApiResponse } from 'next';
import { schema } from '../../graphql/schema';
import prisma from '../../prisma/client';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const typeSchema = await schema();

  const apolloServer = new ApolloServer({
    schema: typeSchema,
    context: () => ({ prisma }),
    // playground: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
};
