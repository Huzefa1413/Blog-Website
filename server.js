const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8000;
const mongoUri =
  'mongodb+srv://huzefa1413:murtaza1413@ecommerceapp.fxfigx3.mongodb.net/BlogWebsite';
mongoose.connect(mongoUri);

app.use(express.json({ extended: false }));

let articleSchema = new mongoose.Schema({
  name: String,
  title: String,
  thumbnail: String,
  content: Array,
  comments: Array,
});
const articleModel = mongoose.model('articles', articleSchema);
app.get('/api/articles', async (req, res) => {
  try {
    const response = await articleModel.find({});
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error connecting to database', err });
  }
});
app.get('/api/articles/:name', async (req, res) => {
  try {
    const articleName = req.params.name;
    const response = await articleModel.findOne({ name: articleName });
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error connecting to database', err });
  }
});
app.post('/api/articles/:name/add-comments', async (req, res) => {
  try {
    const articleName = req.params.name;
    const response = await articleModel.findOne({ name: articleName });
    const newcomment = {
      username: req.body.username,
      text: req.body.text,
    };
    await articleModel.updateOne(
      { name: articleName },
      {
        $set: {
          comments: response.comments.concat(newcomment),
        },
      }
    );
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error connecting to database', err });
  }
});

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
