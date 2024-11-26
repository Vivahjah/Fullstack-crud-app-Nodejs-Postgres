import express from 'express';
import { getAllCustomers, addCustomer,updateCustomer, deleteCustomer,searchCustomers  } from '../controllers/customersControllers.js';

const router = express.Router();

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await getAllCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

// Add a new customer
router.post('/', async (req, res) => {
  const { name, email, job, rate, status } = req.body;

  try {
    const newCustomer = await addCustomer(name, email, job, rate, status);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add customer' });
  }
});
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, job, rate, status } = req.body;

  try {
    const updatedCustomer = await updateCustomer(id, name, email, job, rate, status);
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a customer
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCustomer = await deleteCustomer(id);
    res.json(deletedCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Search for customers
router.get('/search', async (req, res) => {
  const { term } = req.query;

  // if (!term) {
  //   return res.status(400).json({ error: 'Search term is required.' });
  // }

  try {
    const results = await searchCustomers(term);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search customers.' });
  }
});

export default router;
