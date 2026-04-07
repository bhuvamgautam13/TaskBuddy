const Item = require("../models/Item");


// ➕ ADD ITEM
exports.addItem = async (req, res) => {
  try {
    const { name, price, image } = req.body;
    
    if (!name || !price) {
  return res.status(400).json({ message: "Name and price required" });
}

    const item = new Item({ name, price, image });
    await item.save();

    res.json({ message: "Item added", item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 📥 GET ALL ITEMS
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ❌ DELETE ITEM
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    await Item.findByIdAndDelete(id);

    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 🔄 UPDATE ITEM
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};