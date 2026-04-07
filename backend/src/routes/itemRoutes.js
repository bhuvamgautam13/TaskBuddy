const express = require("express");
const router = express.Router();

const {
  addItem,
  getItems,
  deleteItem,
  updateItem,
} = require("../controllers/itemController");

router.post("/", addItem);
router.get("/", getItems);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);

module.exports = router;