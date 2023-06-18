import config from '../config/config';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Book Store API documentation',
    version: '0.0.1',
    description: 'This is a node express mongoose boilerplate in typescript',
    license: {
      name: 'MIT',
      url: 'https://github.com/saisilinus/node-express-mongoose-typescript-boilerplate.git',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}`,
      description: 'Development Server',
    },
  ],
};

export default swaggerDefinition;