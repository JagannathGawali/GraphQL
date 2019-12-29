// import express from 'express';
// import bodyParser from 'body-parser';
// import graphqlHttp from 'express-graphql';

const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp =require('express-graphql');
const {buildSchema} =require('graphql');

let events=[]; 

let app= express();
app.use(bodyParser.json());
app.use("/graphql",graphqlHttp({
    schema:buildSchema(`
        type Event{
            _id:ID!,
            title:String,
            desciption:String,
            price:Float!
        }

        input EventInput{
            title:String,
            desciption:String,
            price:Float!
        }
        type RootQuery{
            events:[Event!]!
        }
        type RootMutation{
            createEvent(eventInput:EventInput):Event
        }
        schema {
            query:RootQuery
            mutation:RootMutation
        }
    `),
    rootValue:{
        events:()=>{
            return events;
        },
        createEvent:({eventInput})=>{
            let event={
                _id:Math.random().toString(),
                title:eventInput.title,
                desciption:eventInput.desciption,
                price:+eventInput.price
            };
            events.push(event);
            return event;
        }
    },
    graphiql:true
}))
app.listen(3001,()=>{
    console.log("server started")
})