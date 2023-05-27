import express from "express";
import { ApolloServer } from "@apollo/server";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4"; //una funcion que permite integrarse al backend en node
import http from "http";
//funcion que sirve para configurar mi graphql con mi servidor (esto puede ser muy cambiante)

//IMPORTANTE: en esta funcion puedo app.get() las routes y al mismo tiempo tener mi servidor graphql (solo consultas de datos)
export async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs, //nuestros tipos de datos
    resolvers, //funciones que se ejecutan por cada tipo
  });

  await server.start();
  // el express.json es útil cuando se espera recibir datos JSON en una solicitud
  //esta ruta es para entrar en el sanbox de apolloserver
  app.use("/graphql", cors(), express.json(), expressMiddleware(server));

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log("server funcioando el  http://localhost:4000/graphql");
}
