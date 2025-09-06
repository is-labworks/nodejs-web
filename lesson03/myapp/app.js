process.env.NODE_ENV = process.env.NODE_ENV || "development";

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const expressOasGenerator = require("express-oas-generator");
const routes = require("./routes/productRoute");
const transactionRoute = require("./routes/transactionRoute");
const extendTransactionRoute = require("./routes/extendTransactionRoute");
const globalErrorHandler = require("./middlewares/globalerrorhandler");
const fs = require("fs");
const path = require("path");

const app = express();

expressOasGenerator.init(app, {
  specOutputPath: "./openapi.json",
  swaggerDocumentOptions: {
    definition: {
      info: {
        title: "Product and Transaction API",
        version: "1.0.0",
        description: "API for managing products and transactions",
      },
    },
  },
  predefinedSpec: {},
  writeIntervalMs: 1000,
});

app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}], ${req.method}, ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", routes);
app.use("/trans", transactionRoute);
app.use("/tx", extendTransactionRoute);

const specPath = path.join(__dirname, "openapi.json");
if (fs.existsSync(specPath)) {
  const spec = require("./openapi.json");
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));
}

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use(globalErrorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
