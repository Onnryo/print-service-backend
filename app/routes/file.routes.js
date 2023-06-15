module.exports = (app) => {
    const files = require("../controllers/file.controller.js");
    const verifyJWT = require("../middleware/verifyJWT");

    app.use(verifyJWT);
    var router = require("express").Router();

    // Retrieve all Files
    router.get("/", files.findAll);
    // Create a new File
    router.post("/", files.create);
    // Retrieve a single File with id
    router.get("/:id", files.findOne);
    // Update a File with id
    router.put("/:id", files.update);
    // Delete a File with id
    router.delete("/:id", files.delete);
    // Retrieve all Requests for File
    router.get("/:id/parts", files.fetchParts);

    app.use("/files", router);
};