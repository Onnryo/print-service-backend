module.exports = (app) => {
    //const files = require("../controllers/file.controller.js");

    var router = require("express").Router();

    // Retrieve Printer stats
    router.get("/", (req, res) => {
        res.json({ message: "Welcome to print-service application." });
    });

    app.use("/api", router);
};