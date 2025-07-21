const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');              
const { Server } = require('socket.io');

dotenv.config();
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Setup socket.io server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
});

// Make `io` available globally (optional but helpful)
app.set('io', io);

const port = process.env.PORT || 4000;
const connectDB = require('./src/config/db.config');

connectDB();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./src/routes/routes'); 
app.use('/api', routes);

// Socket events
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });

  // Optional: log when board_updated is sent from frontend
  socket.on('board_updated', (data) => {
    io.emit('board_updated', data); // broadcast to all clients
  });
});

server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
