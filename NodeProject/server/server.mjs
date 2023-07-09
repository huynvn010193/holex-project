import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import fakeData from "./fakeData/index.js";

const app = express();
const httpServer = http.createServer(app);

const typeDefs = `#graphql
  type Folder {
    id: String,
    name: String,
    createAt:String,
    author: Author
  }
  type Author {
    id: String,
    name: String
  }
  type Query {
    folders: [Folder]
  }
`;
const resolvers = {
  // resolver cha
  Query: {
    folders: () => {
      return fakeData.folders;
    },
  },
  // Viết cho mỗi lần graphQL thấy dữ liệu author thì trả về
  // resolver con
  Folder: {
    author: (parent, args) => {
      const { authorId } = parent;
      return fakeData.authors.find((author) => author.id === authorId);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

// Cấu hình một số middleware
app.use(cors(), bodyParser.json(), expressMiddleware(server));

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log("Server ready at http://localhost:4000");
