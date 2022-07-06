const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware} = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const IMAGE_DIR = './uploaded-images';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

const app = express();
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}))
// Allow CORS for all origins.
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//handles file upload from client side (/uploadForm at the moment)
app.post('/upload', function(req, res) {
  const uploadedImage = req.files.image;
  if (!uploadedImage) {
    return res.status(400).send('Error: Missing "image" argument');
  }

  // Get a random 16-character filename, with the input file's extension.
  const imageFilenameParts = uploadedImage.name.split('.');
  const imageExtension = imageFilenameParts[imageFilenameParts.length - 1];
  const randomFilename = Math.random().toString(36).substring(2, 18) + '.' + imageExtension;

  console.log(uploadedImage); // the uploaded file object

  uploadedImage.mv(
      IMAGE_DIR + '/' + randomFilename,
      (err) => {
        if (err) {
          console.log('Error saving image to filesystem');
          console.log(err);
          return res.sendStatus(500);
        }

        console.log('Image saved as ' + randomFilename);

        return res.send(randomFilename);
      }
  );
});


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});


fs.mkdir(
    IMAGE_DIR,
    (err) => {
      console.log('Error creating uploaded-images directory');
      console.log(err);
    }
);
