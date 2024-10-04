const express = require('express');
const app = express();
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');




const cors = require('cors');

app.use(cors());  // Allow all origins (for development purposes)


const PORT = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Product Management API is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/product-management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

app.use('/api', productRoutes);


