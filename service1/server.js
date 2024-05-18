// Imports
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require("mongoose");
const cors = require("cors");

// Setup Database
const db_url = "mongodb+srv://admin:admin@coe453project.b7gjegg.mongodb.net/?retryWrites=true&w=majority&appName=coe453project";
mongoose.connect(db_url);

// Define Food Schema
const Food_Schema = new mongoose.Schema({
  name: String,
  calories: {
      type: Number,
      min: 0
  }
});

// Define Food Model
const Food = mongoose.model('Food', Food_Schema);

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`

  type RootQuery {
  hello: String!
  }

  type RootMutation {
    getCalories(foodId: String, weight: Int): Float
  }

  schema {
    query: RootQuery
    mutation: RootMutation
 }

`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello, world!';
  },
  getCalories: async ({ foodId, weight }) => {
    const food = await Food.findById(foodId);
    return weight * food.calories / 100;
  },
};

const app = express();
app.use(cors());

app.use(
  '/',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: {
      defaultQuery: '{\n  hello\n}\n',
    },
  })
);

app.listen(3000, () =>
  console.log('Running a GraphQL API server at http://localhost:3000/')
);