module.exports = (app) => {
    const batches = require("../controllers/batch.controller.js");

    var router = require("express").Router();

    // Retrieve all Batches
    router.get("/", batches.findAll);
    // Create a new Batch
    router.post("/", batches.create);
    // Retrieve a single Batch with id
    router.get("/:id", batches.findOne);
    // Update a Batch with id
    router.put("/:id", batches.update);
    // Delete a Batch with id
    router.delete("/:id", batches.delete);
    // Retrieve all Requests for Batch
    router.get("/:id/parts", batches.fetchParts);

    app.use("/api/batches", router);
};