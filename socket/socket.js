const Announcement = require('./../model/announcementModel');
const Content = require('./../model/contentModel');

const organizeData = next => {
  switch (next.operationType) {
    case 'update':
      return {
        operationType: next.operationType,
        documentKey: next.documentKey._id.toString(),
        collectionName: next.ns.coll,
        data: {
          ...next.updateDescription.updatedFields,
          _id: next.documentKey._id.toString(),
        },
        clusterTime: next.clusterTime,
      };
    case 'insert':
      return {
        operationType: next.operationType,
        documentKey: next.documentKey._id.toString(),
        collectionName: next.ns.coll,
        data: {
          ...next.fullDocument,
          _id: next.fullDocument._id.toString(),
        },
        clusterTime: next.clusterTime,
      };
    case 'delete':
      return {
        operationType: next.operationType,
        documentKey: next.documentKey._id.toString(),
        collectionName: next.ns.coll,
        data: {},
        clusterTime: next.clusterTime,
      };
    default:
      break;
  }
};

const sendSocketData = (next, socket, eventName) => {
  socket.emit(eventName, {
    socketId: socket.id,
    collectionName: next.ns.coll,
    message: organizeData(next),
  });
};

const onSocket = async socket => {
  try {
    const announcementStream = Announcement.watch();
    const contentStream = Content.watch();

    announcementStream.on('change', next => sendSocketData(next, socket, 'me'));
    contentStream.on('change', next => sendSocketData(next, socket, 'me'));

    socket.on('disconnect', () => {
      socket.broadcast.emit('callended');
    });

    socket.on('calluser', call => {});
  } catch (err) {}
};

module.exports = onSocket;
