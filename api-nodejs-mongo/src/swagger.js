import swaggerAutogen from 'swagger-autogen';
const swaggerAutogenInstance = swaggerAutogen();


const output = '../swagger_doc.json'
const endpoints = ['./app.js']

swaggerAutogen(output,endpoints)