import http from 'http';
import express from 'express';
import cors from 'cors';

import injectSocketIO from '../socketIoHandler.js';
import { handler } from '../build/handler.js';

const app = express();
const server = http.createServer(app);

// Handle CORS for Express routes
app.use(cors());


// Inject SocketIO
injectSocketIO(server);

// SvelteKit handlers
app.use(handler);

server.listen(3000, () => {
    console.log('Running on http://localhost:3000');
});