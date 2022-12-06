const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const { PORT = 3000, DBADDRESS, NODE_ENV } = process.env;
const app = express();
app.use(express.json());
const auth = require("./middleware/auth");
const { requestLogger, errorLogger } = require("./middleware/logger");
const { handleError, NotFoundError, HttpError } = require("./utils/errors");
const { errors } = require("celebrate");
mongoose.connect(
  `mongodb://${
    NODE_ENV === "production" ? DBADDRESS : "localhost:27017/bloomwebdb"
  }`
);

app.use(requestLogger);

app.use(cors());
app.options("*", cors());

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new HttpError("Server will crash now");
  }, 0);
});

app.use(errors());

app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));

app.use(auth);

app.use("/posts", require("./routes/protectedposts"));
app.use("/users", require("./routes/protectedusers"));

app.get("*", (req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

app.use((err, req, res, next) => handleError(err, res));

app.use(errorLogger);

app.listen(PORT, () => {});
