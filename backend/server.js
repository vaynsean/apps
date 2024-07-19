const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

dotenv.config();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use('/public', express.static(path.join(__dirname, 'public')));

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
});
app.use(limiter);

app.use('/api/users', require('./routes/user'));
app.use('/api/products', require('./routes/product'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});
