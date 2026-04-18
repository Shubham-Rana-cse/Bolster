/* import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb://localhost:27017/bolster`, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

export default connectDB; */

/* 
Your current code reconnects every time connectDB() is called, which causes the “Can't call openUri() on an active connection” error in Next.js hot reload / auth callbacks.

In Next.js, even if you call connectDB() only once in your own code, the file containing it can be imported and executed multiple times because of:

API routes
auth callbacks
server components
hot reload during development
multiple requests hitting the server

For example, during GitHub login:

/api/auth/signin/github
/api/auth/callback/github
maybe session, jwt, or signIn callbacks

Each of those can import the same DB file again, so mongoose.connect() runs again.

Mongoose allows only one active connection per URI in the default connection object, so repeated calls can trigger:

Can't call openUri() on an active connection with different connection strings

That is why people cache the connection globally:

global.mongoose = { conn, promise }

so every later import just reuses the existing connection instead of opening a new one.
*/

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log(`MongoDB Connected: ${mongoose.connection.host}`);
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;