require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const studentRouter = require('./routes/studentRouter');
const announcementRouter = require('./routes/announcementRouter');
const teacherRouter = require('./routes/teacherRouter');
const studentAuhtRouter = require('./routes/authStudent');
const { Server } = require('socket.io');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const onSocket = require('./socket/socket');
const onMeeting = require('./socket/meeting');
const path = require('path');

// ? initinilize app
const app = express();

// ? set graphql

// ? Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('public'));

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

// app.use(requireAuth);
app.use('/studentAPI', studentRouter);
app.use('/announcementAPI', announcementRouter);
app.use('/studentAuth', studentAuhtRouter);
app.use('/teacherAPI', teacherRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const io = new Server(4000, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
io.on('connection', onSocket);
io.on('connection', onMeeting);
mongoose
  .connect(MONGO_URL)
  .then(a => {
    // listen for request
    app.listen(PORT, () => {
      console.log(
        `Connected to DB & Server is Listening on ${PORT}: http://localhost:${PORT}/`,
      );
    });
  })
  .catch(err => {
    console.warn(err);
  });
