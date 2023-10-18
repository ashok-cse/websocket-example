const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
  console.log('Client connected');

  clients.add(ws);


  ws.on('message', (message) => {
    console.log(`Received: ${message}`, clients);
    // Broadcast the message to all connected clients
    clients.forEach((client) => {
        console.log('clinet', client);
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});


// To send data to a specific client
function sendToClient(client, message) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
  
  // Example of sending data to a specific client
  setTimeout(() => {
    server.clients.forEach((client) => {
      sendToClient(client, 'Hello from the server!');
    });
  }, 5000);