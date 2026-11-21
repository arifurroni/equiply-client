import { betterAuth } from "better-auth";
import { MongoClient, type Document } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { LOCATIONS } from "./locations";

const client = new MongoClient(process.env.MONGODB_URI as string);
export const db = client.db("equiply-db");

export type TAuthUserRecord = Document & {
    _id: string;
    name?: string;
    email?: string;
    role?: string;
    location?: string;
};

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
                defaultValue: "",
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