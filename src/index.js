const	express = require('express');
const	{ ApolloServer } = require('apollo-server-express');
require('dotenv').config();

const	db = require('./db');
const	models = require('./models')
const	typeDefs = require('./schema')
const	resolvers = require('./resolves');

const	port = process.env.PORT || 3030;

const	DATABASE_URL = process.env.DATABASE_URL;

const	app = express();

db.connect(DATABASE_URL);

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => {
		return { models }
	}	
});

server.applyMiddleware({app, path : '/api'})

app.listen(port, () => 
	console.log(
		`GraphQL Server running on ${port}${server.graphqlPath}!`)
);
