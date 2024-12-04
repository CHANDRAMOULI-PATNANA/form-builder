const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/forms', require('./routes/formRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// const mongoose = require('mongoose');
// require('dotenv').config();  // Load environment variables from .env

// // Connect to MongoDB using the MONGO_URI from .env file
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected...');
//   } catch (err) {
//     console.error('Error connecting to MongoDB:', err.message);
//     process.exit(1);  // Exit with failure if unable to connect
//   }
// };

// // Invoke the connection function
// connectDB();

