const onMeeting = async socket => {
  try {
    socket.on('meeting', data => {
      console.log(data);
    });

    socket.emit('meeting', { mess: 'hello for meeting' });
  } catch (err) {
    console.error(err);
  }
};

module.exports = onMeeting;
