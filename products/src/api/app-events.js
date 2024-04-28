module.exports = (app) => {
  app.use("/app-events", async (req, res) => {
    console.log("======= Products Service Receoved events =====");
    res.status(200).json(payload);
  });
};
