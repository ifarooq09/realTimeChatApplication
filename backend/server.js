const app = require('../backend/app.js')
const connectDB = require('../backend/db/conn.js')

const port = process.env.PORT || 3000;

const startServer = async () => { 
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Server connected on port ${port}`))
    } catch (error) {
        console.error("Erro connecting server", error)
    }
}

startServer()