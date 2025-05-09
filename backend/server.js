const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Internship = require('./models/Internship');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Handle MongoDB events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Routes
app.get('/api/internships', async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/internships', async (req, res) => {
  const internship = new Internship(req.body);
  try {
    const newInternship = await internship.save();
    res.status(201).json(newInternship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/internships/:id', async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      { isFavourite: req.body.isFavourite },
      { new: true }
    );
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.json(internship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete route (optional)
app.delete('/api/internships/:id', async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.json({ message: 'Internship deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));