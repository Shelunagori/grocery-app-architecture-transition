const dotEnv = require("dotenv");
const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

if (process.env.NODE_ENV !== "prod") {
    const configFile = `./.env.${process.env.NODE_ENV}`;
    dotEnv.config({ path: configFile });
  } else {
    dotEnv.config();
  }

const app = express();
app.use(cors());
app.use(express.json());

app.use("/customer", proxy(process.env.customers_services_base));
app.use("/shopping", proxy(process.env.shopping_services_base));
app.use("/", proxy(process.env.products_services_base));

app.listen(process.env.PORT, () => {
        console.log(`api-getway listening to port ${process.env.PORT}`);
});
