import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../prisma/client';
import { sendWelcomeEmail } from '../../../utils/mail';

const providers = [
  Providers.Email({
    server: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
    from: process.env.SMTP_FROM,
  }),
  // Providers.Facebook({
  // 	clientId: process.env.FACEBOOK_CLIENT_ID,
  // 	clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  // }),
  Providers.Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  // Providers.Twitter({
  // 	clientId: process.env.TWITTER_ID,
  // 	clientSecret: process.env.TWITTER_SECRET,
  // }),
];

const callbacks = {
  async signIn(user, account, profile) {
    return true;
  },

  async newUser(user) {
    sendWelcomeEmail(user.email);
    return true;
  },

  async session(session, user) {
    session.user = user;

    return session;
  },
};

const pages = {
  newUser: '/auth/new-user',
};

const options = {
  providers,
  callbacks,
  pages,

  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
};

const authHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const tempUrl = req.url.split('=');
  if (tempUrl[0] == '/api/auth/session?update') {
    const endResponse = res.end as (cb?: () => void) => void;
    res.end = (cb: () => void) => {
      res.setHeader('Location', '/');
      res.status(301);
      return endResponse.apply(res, [cb]);
    };
    return NextAuth(req, res, options);
  } else if (tempUrl[0] == '/api/auth/session?profile') {
    const username = tempUrl[1];
    const endResponse = res.end as (cb?: () => void) => void;
    res.end = (cb: () => void) => {
      res.setHeader('Location', `/u/${username}`);
      res.status(301);
      return endResponse.apply(res, [cb]);
    };
    return NextAuth(req, res, options);
  } else {
    return NextAuth(req, res, options);
  }
};
export default authHandler;
