const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://Anish:vampanish@cluster.5adol.mongodb.net/?retryWrites=true&w=majority&appName=cluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ success: false, message: 'Username already exists' });
    }

    const user = new User({ username, password });
    await user.save();
   return res.json({ success: true, message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
