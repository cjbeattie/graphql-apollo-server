// Tutorial from https://www.apollographql.com/docs/apollo-server/getting-started/
// To run server, "node index.js"
// Then go to http://localhost:4000 to see the GraphQL Playground (Apollo Server hosts GraphQL Playground automatically when you run it in a non-production environment.)

// Here's a GraphQL query string for executing the books query:
// {
//     books {
//       title
//       author
//     }
//   }

const { ApolloServer, gql } = require('apollo-server');

// ********* Define your GraphQL schema *********

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    # This "Book" type defines the queryable fields for every book in our data source.
    type Book {
        title: String
        author: String
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        books: [Book]
    }
`;

// ********* Define your data set *********

const books = [
    {
    title: 'The Awakening',
    author: 'Kate Chopin',
    },
    {
    title: 'City of Glass',
    author: 'Paul Auster',
    },
];


// ********* Define a resolver *********

// We've defined our data set, but Apollo Server doesn't know that it should use that data set when it's executing a query. To fix this, we create a resolver.
// Resolvers tell Apollo Server how to fetch the data associated with a particular type. Because our Book array is hardcoded, the corresponding resolver is straightforward.
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
    },
};

// ********* Create an instance of apollo server *********

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
