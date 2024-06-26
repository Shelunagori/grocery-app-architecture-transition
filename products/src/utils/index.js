const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const axios = require("axios");
const amqplib = require("amqplib");

const { APP_SECRET, MESSAGE_BROKER_URL, EXCHNAGE_NAME } = require("../config");

//Utility functions
module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    console.log(signature);
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

// module.exports.PublishCustomerEvents = (payload) => {
//   try {
//     axios.post(`${process.env.apiGetwayPath}/customer/app-events`, {
//       payload,
//     });
//   } catch (error) {
//     console.log("error >>>>>", error.message);
//   }
// };

// module.exports.PublishShoppingEvents = (payload) => {
//   console.log("path", `${process.env.apiGetwayPath}/shopping/app-events`);
//   try {
//     axios.post(`${process.env.apiGetwayPath}/shopping/app-events`, {
//       payload,
//     });
//   } catch (error) {
//     console.log("error >>>>>", error.message);
//   }
// };

/******** MESSAGE BROKER **********/

//create channel
module.exports.CreateChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHNAGE_NAME, "direct", false);
    console.log("RabbitMQ connected");
    return channel;
  } catch (error) {
    throw error;
  }
};

//publish message
module.exports.PublishMessage = async (channel, binding_key, message) => {
  try {
    await channel.publish(EXCHNAGE_NAME, binding_key, Buffer.from(message));
    console.log("Message Published");
  } catch (error) {
    throw error;
  }
};
//subscribe message
module.exports.SubscribeMessage = async (channel, service, binding_key) => {
  const appQueue = await channel.assertQueue(QUEUE_NAME);
  channel.bindQueue(appQueue.queue, EXCHNAGE_NAME, binding_key);
  channel.consume(appQueue.queue, (data) => {
    console.log("Data Received");
    console.log(data.content.toString());
    channel.ack(data);
  });
};
