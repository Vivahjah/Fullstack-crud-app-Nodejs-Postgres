import { pool } from "../db.js";

// Get all customers
export const getAllCustomers = async () => {
  try {
    const result = await pool.query('SELECT * FROM customer_tb');
    return result.rows; // Return all rows
  } catch (error) {
    console.error('Error fetching customers:', error.message);
    throw error;
  }
};

// Add a new customer
export const addCustomer = async (name, email, job, rate, status = true) => {
  try {
    const result = await pool.query(
      `INSERT INTO customer_tb (Name, Email, Job, Rate, Status) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, job, rate, status]
    );
    return result.rows[0]; // Return the newly added customer
  } catch (error) {
    console.error('Error adding customer:', error.message);
    throw error;
  }
};

//Update a Customer
export const updateCustomer = async (id, name, email, job, rate, status) => {
  try {
    const result = await pool.query(
      `UPDATE customer_tb 
       SET Name = $1, Email = $2, Job = $3, Rate = $4, Status = $5 
       WHERE id = $6 
       RETURNING *`,
      [name, email, job, rate, status, id]
    );

    if (result.rowCount === 0) {
      throw new Error(`Customer with id ${id} does not exist.`);
    }

    return result.rows[0]; // Return the updated customer
  } catch (error) {
    console.error('Error updating customer:', error.message);
    throw error;
  }
};

//Delete a customer

export const deleteCustomer = async (id) => {
  try {
    const result = await pool.query(
      `DELETE FROM  customer_tb 
      WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      throw new Error(`Customer with id ${id} does not exist.`);
    }

    return result.rows[0]; // Return the deleted customer
  } catch (error) {
    console.error('Error deleting customer:', error.message);
    throw error;
  }
};
// Search for customers
export const searchCustomers = async (searchTerm) => {
  try {
    const query = `
      SELECT * FROM customer_tb
      WHERE Name ILIKE $1
         OR Email ILIKE $1
         OR Job ILIKE $1
    `;
    const result = await pool.query(query, [`%${searchTerm}%`]);
    return result.rows; // Return the matching rows
  } catch (error) {
    console.error('Error searching customers:', error.message);
    throw error;
  }
};

