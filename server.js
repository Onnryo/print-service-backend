//https://www.bezkoder.com/node-express-sequelize-postgresql/
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const originsWhitelist = require("./app/config/originsWhitelist");
const credentials = require("./app/middleware/credentials");

const app = express();

var corsOptions = {
    origin: (origin, callback) => {
        if (originsWhitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
};

//middleware for cookies
app.use(cookieParser());

app.use(credentials);

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to print-service application." });
});

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

require("./app/routes/index.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/request.routes")(app);
require("./app/routes/part.routes")(app);
require("./app/routes/file.routes")(app);
require("./app/routes/comment.routes")(app);
require("./app/routes/batch.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
