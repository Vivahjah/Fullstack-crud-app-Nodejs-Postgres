
import express from 'express'; 
import cors from "cors"
import customerRoutes from "./routes/customersRoutes.js"
import { connectToDatabase } from "./db.js";

const app = express(); 


// Middleware to parse JSON
app.use(express.json());
app.use(cors())

// Routes
app.use('/api/customers', customerRoutes);



const PORT = process.env.PORT || 3000; 

const startServer = async () => {
  await connectToDatabase(); // Connect to the database
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};


startServer();