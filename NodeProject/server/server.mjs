import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

import mongoose from "mongoose";
import "./firebaseConfig.js";
import "dotenv/config";
import { resolvers } from "./resolvers/index.js";
import { typeDefs } from "./schemas/index.js";
import { getAuth } from "firebase-admin/auth";

const app = express();
const httpServer = http.createServer(app);

// connect to DB
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ahwxjzm.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

// Viết Authoration JWT middleware: => Chặn tất cả request từ phía client gửi tới. => Cần verify token coi có hợp lệ hay không
// => đưa xuống tiếp xử lý
const authorizationJWT = async (req, res, next) => {
  console.log({ authorization: req.headers.authorization });
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    const accessToken = authorizationHeader.split(" ")[1];
    console.log(
      "🚀 ~ file: server.mjs:39 ~ authorizationJWT ~ accessToken:",
      accessToken
    );
    getAuth()
      .verifyIdToken(accessToken)
      .then((decodedToken) => {
        console.log({ decodedToken });
        next();
      })
      .catch((err) => {
        console.log({ err });
        return res.status(403).json({ message: "Forbidden", error: err });
      });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next(); //=> Nếu reuqest gửi lên hợp lệ => gọi tới next để tiến hành gọi tới các middleware tiếp theo
};

// Cấu hình một số middleware
app.use(cors(), authorizationJWT, bodyParser.json(), expressMiddleware(server));

mongoose.set("strictQuery", false);
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to DB");
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log("Server ready at http://localhost:4000");
  });
