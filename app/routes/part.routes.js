module.exports = (app) => {
    const parts = require("../controllers/part.controller.js");
    const verifyJWT = require("../middleware/verifyJWT");

    app.use(verifyJWT);
    var router = require("express").Router();

    // Retrieve all Parts
    router.get("/", parts.findAll);
    // Create a new Part
    router.post("/", parts.create);
    // Retrieve a single Part with id
    router.get("/:id", parts.findOne);
    // Update a Part with id
    router.put("/:id", parts.update);
    // Delete a Part with id
    router.delete("/:id", parts.delete);

    app.use("/parts", router);
};