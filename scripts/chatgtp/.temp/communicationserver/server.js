const WebSocket = require('ws');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const server = new WebSocket.Server({ noServer: true });

app.use(bodyParser.json());
app.use(cors());

let connectedClients = [];

server.on('connection', (socket) => {
  console.log('Client connected');
  connectedClients.push(socket);

  socket.on('message', (message) => {
    console.log('Received message:', message);
  });

  socket.on('close', () => {
    connectedClients = connectedClients.filter((client) => client !== socket);
  });
});

app.post('/ask', async (req, res) => {
  console.log('post request received');
  const question = req.body.question;

  if (!question) {
    return res.status(400).json({ error: 'Question not provided' });
  }
  console.log('post request received');

  try {
    const answer = await askClients(question);
    res.json({ answer });
  } catch (error) {
  console.log(error);
  res.status(500).json({ error: 'Failed to get answer from clients' });
  }
});

function askClients(question) {
  return new Promise((resolve, reject) => {
    if (connectedClients.length === 0) {
      return reject('No clients connected');
    }

    connectedClients.forEach((client) => {
      client.send(JSON.stringify({ action: 'askQuestion', question }));
    });

    // Set a timeout for clients to respond
    const timeout = setTimeout(() => {
      reject('Timeout waiting for client response');
    }, 10000); // 10 seconds

    server.once('message', (message) => {
      const data = JSON.parse(message);
      if (data.action === 'answerQuestion') {
        clearTimeout(timeout);
        resolve(data.answer);
      }
    });
  });
}

const httpServer = app.listen(3000, () => {
  console.log('HTTP server listening on port 3000');
});

httpServer.on('upgrade', (request, socket, head) => {
  server.handleUpgrade(request, socket, head, (socket) => {
    server.emit('connection', socket, request);
  });
});
