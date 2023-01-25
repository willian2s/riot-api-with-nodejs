import pino from "pino";
import pinoHttp from "pino-http";

export function createLogger(name: string, prettifier = false) {
  const logger = pino({
    hooks: {
      // @see https://getpino.io/#/docs/help?id=avoid-message-conflict
      logMethod(inputArgs: any, method) {
        if (inputArgs.length === 2 && inputArgs[0].msg) {
          inputArgs[0].originalMsg = inputArgs[0].msg;
        }
        return method.apply(this, inputArgs);
      },
    },
    name,

    transport:
      prettifier === true
        ? {
            options: {
              colorize: true,
              customColors: "err:red,info:blue",
              ignore:
                "name,pid,hostname,res.headers,req.headers,req.remoteAddress,req.remotePort,req.id",
              translateTime: "SYS:standard",
            },
            target: "pino-pretty",
          }
        : undefined,
  });

  return logger;
}

export type LoggerReturnType = ReturnType<typeof createLogger>;

export const expressLogger = (logger: pino.Logger) => pinoHttp({ logger });

export default createLogger;
