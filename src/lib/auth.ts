import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";
import { APIError, createAuthMiddleware } from "better-auth/api";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db(process.env.DB_NAME);

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
  plugins: [jwt()],
        hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") return;

      const password = String(ctx.body?.password ?? "");
      if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password)) {
        throw new APIError("BAD_REQUEST", {
          message: "Password needs 6+ characters with one uppercase and one lowercase letter.",
        });
      }
    }),
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    modelName: "users",
    additionalFields: {
      role: { type: "string", defaultValue: "customer", input: true },
      isBlocked: { type: "boolean", defaultValue: false, input: false },
      businessName: { type: "string", required: false, input: true },
      subscriptionPlan: { type: "string", defaultValue: "free", input: false },
      subscriptionExpiresAt: { type: "date", required: false, input: false },
    },
  },
    databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const role = user.role === "vendor" ? "vendor" : "customer";
          return { data: { ...user, role } };
        },
      },
      update: {
        before: async (user) => {
          const data = { ...user } as Record<string, unknown>;
          delete data.role;
          delete data.isBlocked;
          delete data.subscriptionPlan;
          delete data.subscriptionExpiresAt;
          return { data: data as typeof user };
        },
      },
    },
  },
});