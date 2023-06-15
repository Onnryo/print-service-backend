module.exports = (app) => {
    const requests = require("../controllers/request.controller.js");
    const verifyJWT = require("../middleware/verifyJWT");

    app.use(verifyJWT);
    var router = require("express").Router();

    // Retrieve all Requests
    router.get("/", requests.findAll);
    // Create a new Request
    router.post("/", requests.create);
    // Retrieve a single Request with id
    router.get("/:id", requests.findOne);
    // Update a Request with id
    router.put("/:id", requests.update);
    // Delete a Request with id
    router.delete("/:id", requests.delete);
    // Retrieve all Requests for Request
    router.get("/:id/parts", requests.fetchParts);
    // Retrieve all Comments for Request
    router.get("/:id/comments", requests.fetchComments);
    // Retrieve all Files for Request
    router.get("/:id/files", requests.fetchFiles);

    app.use("/requests", router);
};