const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const dotEnv = require("dotenv").config();

const { APP_SECRET } = require("../config");

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

module.exports.PublishCustomerEvents = (payload) => {
  try {
    axios.post(`${process.env.apiGetwayPath}/customer/app-events`, {
      payload,
    });
  } catch (error) {
    console.log("error >>>>>", error.message);
  }
};

module.exports.PublishShoppingEvents = (payload) => {
  console.log("path", `${process.env.apiGetwayPath}/shopping/app-events`);
  try {
    axios.post(`${process.env.apiGetwayPath}/shopping/app-events`, {
      payload,
    });
  } catch (error) {
    console.log("error >>>>>", error.message);
  }
};
