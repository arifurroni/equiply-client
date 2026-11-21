import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { LOCATIONS } from "./locations";

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
            },
            location: {
                type: [...LOCATIONS],
                required: false,
                input: false,
            },

        }
    },

    //...other options
    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {

    },

});