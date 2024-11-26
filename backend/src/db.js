import pkg from 'pg'; 
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config(); 

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
  ssl: {
    rejectUnauthorized: false, // Neon typically requires SSL
  },
});

export const connectToDatabase = async () => {
  try {
    await pool.connect(); 
    console.log('Connected to the database successfully!');
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1); // Exit the application if the connection fails
  }
};

export { pool }; 
