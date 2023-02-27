const express = require("express");
const cors = require("cors");
var dotenv = require('dotenv');
dotenv.config();
var bcrypt = require("bcryptjs");
console.log(bcrypt.hashSync('secret', 8))

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// db.sequelize.sync()
//     .then(() => {
//         console.log("Synced db.");
//     })
//     .catch((err) => {
//         console.log("Failed to sync db: " + err.message);
//     });

// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

const mailer = require('./helper/mailer')
// simple route
app.get("", (req, res) => {
    res.status(200).json({ message: "Welcome to my application." });
});

require("./routes")(app);
require("./task-schedule")();


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});