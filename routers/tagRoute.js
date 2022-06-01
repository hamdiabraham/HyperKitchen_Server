const express = require("express");
const tagController = require("../controllers/tagController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/tag", tagController.getTag);
router.get("/tag/create", tagController.addTag);
router.post("/tag/create", tagController.createTag);
router.get("/tag/edit/:id", tagController.editTag);
router.put("/tag/edit/:id", tagController.editPostTag);
router.delete("/tag/delete/:id", tagController.deleteTag);

module.exports = router;
