const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');


const app = express(); // for starting server
app.use(bodyParser.json());
// app.get('/', (req, res, next) => { // helps to listen a get request
// 	res.send('Hello World!');
// })
app.use('/graphql', graphqlHttp({
	schema: buildSchema(`
		type RootQuery {
			events: [String!]!
		}

		type RootMutation {
			createEvent(name: String): String 
		}
		schema {
			query: RootQuery  
			mutation: RootMutation
		`),
	rootValue: {
		events: () => {
			return ['Romantic Cooking', 'Sailing', 'All-Night Coding']
		},
		createEvent: (args) => {
			const eventName = args.name;
			return eventName;

		}
	}
}));
app.listen(3000); // port for launching applictaion


// now we are implementing graphql on this server


