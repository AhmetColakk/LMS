const Announcement = require('./../model/announcementModel');
const Student = require('./../model/studentModel');
const Teacher = require('./../model/teacherModel');

const onSocket = async socket => {
  // setInterval(() => {
  //   socket.emit('me', { ms: 'again' });
  // }, 2000);

  try {
    const announcementStream = Announcement.watch();
    const studentStream = Student.watch();
    const teacherStream = Teacher.watch();

    announcementStream.on('change', next => {
      socket.emit('me', {
        id: socket.id,
        message: next,
      });
      console.log(next);
    });
    studentStream.on('change', next => {
      socket.emit('me', {
        id: socket.id,
        message: next,
      });
      console.log(next);
    });
    teacherStream.on('change', next => {
      socket.emit('me', {
        id: socket.id,
        message: next,
      });
      console.log(next);
    });

    socket.on('disconnect', () => {
      socket.broadcast.emit('callended');
    });

    socket.on('calluser', call => {
      console.log(call);
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = onSocket;
