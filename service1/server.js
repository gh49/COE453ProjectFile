// Imports
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`

  type Food {
    name: String
    calories: Int
    id: String
  }

  type Mutation {
    getCalories(food: Food, weight: Int): Int
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello, world!';
  },
  getCalories: ({ food, weight }) => food.calories*weight/100,
};

const app = express();

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
  console.log('Running a GraphQL API server at port 3000')
);