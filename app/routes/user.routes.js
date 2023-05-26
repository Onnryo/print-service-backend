module.exports = (app) => {
    const users = require("../controllers/user.controller.js");
    const verifyJWT = require("../middleware/verifyJWT");

    app.use(verifyJWT);
    var router = require("express").Router();

    // Retrieve all Users
    router.get("/", users.findAll);
    // Create a new User
    router.post("/", users.create);
    // Retrieve a single User with id
    router.get("/:id", users.findOne);
    // Update a User with id
    router.put("/:id", users.update);
    // Delete a User with id
    router.delete("/:id", users.delete);
    // Retrieve all Requests for User
    router.get("/:id/requests", users.fetchRequests);

    app.use("/api/users", router);
};
