const app = require('../backend/app.js');
const connectDB = require('../backend/db/conn.js');
const setupSocket = require('./socket.js');

const port = process.env.PORT || 3000;

const startServer = async () => { 
    try {
        // Connect to MongoDB
        await connectDB(process.env.MONGO_URI);
        
        // Start the HTTP server
        const server = app.listen(port, () => console.log(`Server connected on port ${port}`));

        // Setup WebSockets
        setupSocket(server);
    } catch (error) {
        console.error("Error connecting server", error);  // Fixed typo here
    }
};

startServer();
