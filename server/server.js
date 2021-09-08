// load modules
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 4001; // use either host env port or local port
const controller = require("./controller");

const app = express(); // let app = new express,
app.use(cors()); //enable cors
app.use(express.json()); // recognize request objects as JSON

// get route
app.get("/api/getart", controller.getArt);

//register and login routes
app.use("/auth", require("./auth-routes/jwtAuth"));

//dashboard route
app.use("/dashboard", require("./auth-routes/dashboard"));

// server listening
app.listen(port, () => {
  console.log(`serving on port ${port}`);
});
