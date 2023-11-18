const WebSocket = require('ws');

let connectedClients = [];
const server = new WebSocket.Server({ noServer: true });

server.on('connection', (socket) => 
{
  connectedClients.push(socket);

  socket.on('close', () => 
  {
    connectedClients = connectedClients.filter((client) => client !== socket);
  });
});

function update(filename, filecontent) 
{
  if (connectedClients.length === 0) 
  {
    console.log('No clients connected to send update!');
  }

  connectedClients.forEach((client) => 
  {
    client.send(JSON.stringify({ action: 'update', filename }));
  });
}

function error(filename, error) 
{
  if (connectedClients.length === 0) 
  {
    console.log('No clients connected to send error!');
  }

  connectedClients.forEach((client) => 
  {
    client.send(JSON.stringify({ action: 'error', filename, error }));
  });
}

module.exports = {
  server,
  update,
  error,
}