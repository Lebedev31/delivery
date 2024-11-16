import passport from "passport";
import { Strategy as GoogleStategy } from "passport-google-oauth20";
import { Strategy as YandexStrategy } from "passport-yandex";
import { BaseServices } from "../services/baseServices";
import NewUserSchema from "../models/NewUser";
import dotenv from "dotenv";
import { BaseCustomError } from "../error/errorBase";
import { ErrorCodeEnum } from "../error/errorCode";

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
const YANDEX_CLIENT_ID = process.env.YANDEX_CLIENT_ID as string;
const YANDEX_CLIENT_SECRET = process.env.YANDEX_CLIENT_SECRET as string;

const setupGoogleStrategy = () => {
  passport.use(
    new GoogleStategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/google/callback",
        scope: ["profile", "email"],
      },

      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await NewUserSchema.findOne({
            email: profile.emails?.[0]?.value,
          });

          if (user) {
            return done(null, user);
          }
          if (!user && profile.emails?.[0]?.value) {
            const userServise = new BaseServices(NewUserSchema);
            const newUser = await userServise.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              dateOfBirth: "",
              password: "",
            });
            return done(null, newUser);
          }
        } catch (error) {
          return done(
            error instanceof Error
              ? error
              : new BaseCustomError(
                  "Серверная ошибка",
                  ErrorCodeEnum.INTERVAL_SERVER_ERROR,
                  "INTERVAL_SERVER_ERRORs"
                )
          );
        }
      }
    )
  );
};

export const setupYandexStrategy = () => {
  passport.use(
    new YandexStrategy(
      {
        clientID: YANDEX_CLIENT_ID,
        clientSecret: YANDEX_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/yandex/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          if (profile.emails) {
            const emailUser = profile.emails[0].value;
            const user = await NewUserSchema.findOne({
              email: emailUser,
            });

            if (user) {
              return done(null, user);
            }

            if (!user && profile.displayName) {
              const userServise = new BaseServices(NewUserSchema);
              const newUser = await userServise.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                dateOfBirth: "",
                password: "",
              });

              return done(null, newUser);
            }
          }
        } catch (error) {
          return done(
            error instanceof Error
              ? error.message
              : new BaseCustomError(
                  "Серверная ошибка",
                  ErrorCodeEnum.INTERVAL_SERVER_ERROR,
                  "INTERVAL_SERVER_ERRORs"
                ).message,
            false
          );
        }
      }
    )
  );
};

export default setupGoogleStrategy;
