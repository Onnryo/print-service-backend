module.exports = (app) => {
    const auth = require("../controllers/auth.controller.js");

    var router = require("express").Router();

    // Retrieve Printer stats
    router.get("/", (req, res) => {
        res.json({ message: "Welcome to print-service application." });
    });

    // Register User
    router.post("/signup", auth.register);

    // Authenticate User
    router.post("/login", auth.login);

    // Refresh JWT Access Token
    router.get("/refresh", auth.refreshToken);

    // Logout User
    router.get("/logout", auth.logout);

    // Reset Password
    router.post("/forgotpassword", (req, res) => {
        res.json({ message: "TODO" });
    });

    app.use("/", router);
};
