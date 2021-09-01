const express = require("express");
const morgan = require("morgan");

// inicializacion
const app = express();

// settings
app.set("port", process.env.PORT || 5000);

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use("/api/badges", require("./routes/badge"));

// startin the server
app.listen(app.get("port"), () => {
	console.log(`Server run on http://localhost:${app.get("port")}`);
});
