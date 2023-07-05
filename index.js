const path = require('path');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const teacherAuthRouter = require('./routes/teacherAuthRouter');
const studentAuhtRouter = require('./routes/authStudent');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const onSocket = require('./socket/socket');
const onMeeting = require('./socket/meeting');

const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const requireAuth = require('./middleware/ruquireAuth');
const { formatError } = require('apollo-errors');

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('public'));

app.use('/api', studentAuhtRouter);
app.use('/api', teacherAuthRouter);

app.use(
  '/graphql',
  requireAuth,
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

io.on('connection', onSocket);
io.on('connection', onMeeting);

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
mongoose
  .connect(MONGO_URL)
  .then(() => {
    // ? listen for request
    server.listen(PORT, () => {
      console.log(
        `Connected to DB & Server is Listening on ${PORT}: http://localhost:${PORT}/`,
      );
    });
  })
  .catch(err => {
    console.warn(err);
  });
