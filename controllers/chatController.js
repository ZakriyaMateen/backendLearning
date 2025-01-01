const Message = require('../models/message_Schema');
const User = require('../models/userSchema');

exports.sendMessage = async (req, res) => {
  const { receiverId, content, senderId } = req.body;
  // const senderId = req.user.id; // Assume user ID is available from JWT

  try {
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      content
    });

    await message.save();
    console.log('message saved');
    
    // Emit message to the receiver via Socket.IO (ensure io is available)
    req.app.get('io').to(receiverId).emit('newMessage', {
      senderId,
      content,
      receiverId,
      messageId: message._id
    });
    console.log('message sent');

    res.status(201).json({ message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
