require('dotenv').config();
  const path = require('path');
  const express = require('express');
  const bodyParser = require('body-parser');
const connection = require("./db");

  const session = require('express-session');
  const MongoDBStore = require('connect-mongodb-session')(session);
  const cors = require('cors');
  const corsOptions = {
    origin: true,
    credentials: true
  }

const List = require('./models/list');
// const Comment = require('./models/comment');
  
  const app = express();
app.use(cors(corsOptions));
// app.use(cors());

  app.options('*', cors(corsOptions));

  const store = new MongoDBStore({
    uri: process.env.DBC,
    collection: 'sessions'
  });

  app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store,
      cookie: { maxAge: 1000 * 60 * 60 * 24 }
    })
  );

  // app.use(csrfProtection);
  
  app.set('views', path.join(__dirname, '/views'));
  app.set('view engine', 'ejs');
  app.set('views', 'views');

  const listRoutes = require('./routers/list');

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json())
  
  app.use(express.static(__dirname));

  // app.use(multer({
    // dest: path.join(__dirname, 'uploads/')}).single('img'));

    // app.use(flash())

  app.use((req, res, next) => {
    if (!req.session.list) {
      return next();
    }
    List.findById(req.session.list._id)
      .then(list => {
        console.log(list);
        req.list = list;
        next();
      })
      .catch(err => console.log(err));
  });

  app.use('/', listRoutes);

connection()
  .then(client => {
    console.log('Connected port 8000');
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
});