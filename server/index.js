import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios'; 

const typeDefs = `
 type User{
    id:ID!
    name:String!
    username:String!
    email:String!
    phone:String!
    website:String!
}

  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    userId:ID!
    user: User
  }

  type Query {
    getTodos: [Todo]
    getUsers: [User]
    getUserById(id:ID!): User
  }
`;

const resolvers = {
    Todo:{
            user: async (todo) =>{
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`);
            return response.data;}
    },
  Query: {
    getTodos: async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      return response.data;
    },
    getUsers: async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data;
      },
    getUserById: async (parent,{id}) => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        return response.data;
      }
  },
};

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(bodyParser.json());
  app.use(cors());

  app.use('/graphql', expressMiddleware(server));

  app.listen(8000, () => {
    console.log('Connected at port: 8000');
  });
}

startServer();
