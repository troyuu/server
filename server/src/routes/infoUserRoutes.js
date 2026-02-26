const express = require("express");
const router = express.Router();
const infoUserController = require("../controllers/infoUserController");

router.get("/", infoUserController.getAll);
router.get("/:id", infoUserController.getById);
router.put("/:id", infoUserController.update);
router.delete("/:id", infoUserController.remove);

module.exports = router;