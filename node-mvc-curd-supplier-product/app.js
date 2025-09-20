const express = require("express");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const productRoutes = require("./routes/productRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const productApiRoutes = require("./routes/productApiRoutes");
const supplierApiRoutes = require("./routes/supplierApiRoutes");
const userRoutes = require("./routes/user");
const authMiddleware = require("./controllers/authController");
const { requireLogin } = require("./middleware/auth");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product & Supplier API",
      version: "1.0.0",
      description: "RESTful API for managing Products and Suppliers",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", userRoutes);
app.use("/products", requireLogin, productRoutes);
app.use("/suppliers", requireLogin, supplierRoutes);
app.use("/api/products", productApiRoutes);
app.use("/api/suppliers", supplierApiRoutes);

const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});

module.exports = app;