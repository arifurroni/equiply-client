import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("equiply-db");

export const auth = betterAuth({

    database: mongodbAdapter(db, {
        client,
    }),

    user: {
       additionalFields: {
          role: {
              type: ["customer", "owner", "admin"],
              input: false,
              defaultValue: "customer",
            } 
        }
    },

    //...other options
    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {

    },

});