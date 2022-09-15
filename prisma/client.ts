import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    log: ['info'],
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['info'],
    });
  }
  prisma = global.prisma;
}
export default prisma;

// Added this based on the comment here:
// https://github.com/nextauthjs/next-auth/issues/824#issuecomment-734800530
declare global {
  namespace NodeJS {
    interface Global {
      prisma: any;
    }
  }
}
