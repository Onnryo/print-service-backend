module.exports = (app) => {
    const files = require("../controllers/file.controller.js");
    const verifyJWT = require("../middleware/verifyJWT");
    const multer = require("multer"); // Import multer for file uploads
    const path = require("path");
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/"); // Specify the destination folder where files will be saved
        },
        filename: function (req, file, cb) {
            // Generate a unique filename for each file
            const uniqueSuffix =
                Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(
                null,
                file.originalname +
                    "-" +
                    uniqueSuffix +
                    path.extname(file.originalname)
            );
        },
    });

    const upload = multer({ storage: storage });

    app.use(verifyJWT);
    var router = require("express").Router();

    // Retrieve all Files
    router.get("/", files.findAll);
    // Create a new File
    router.post("/:id", upload.array("files", 10), files.uploadFile);
    // Retrieve a single File with id
    router.get("/:id", files.findOne);
    // Download a single File with id
    router.get("/:id/download", files.download);
    // Update a File with id
    router.put("/:id", files.update);
    // Delete a File with id
    router.delete("/:id", files.delete);
    // Retrieve all Requests for File
    router.get("/:id/parts", files.fetchParts);

    app.use("/files", router);
};
