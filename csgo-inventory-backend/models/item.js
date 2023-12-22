const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String, // Name of the item
    classid: String, // Unique identifier for the item
    icon_url: String, // URL for the item's icon
    icon_url_large: String, // URL for the item's larger icon
    type: String, // General type of the item (e.g., 'Gun', 'Knife', 'Glove', 'Agent')
    exterior: String, // Exterior quality of the item (e.g., 'Battle-Scarred', 'Factory New')
    weapon_type: {
        type: String,
        required: function() { return this.type === 'Gun' || this.type === 'Knife'; }
        // Categories like 'Pistol', 'Shotgun', etc. Only for Guns and Knives
    }, 
    specific_type: String, // The exact type of weapon like 'USP-S', 'AK-47'. Relevant for Guns and Knives
    rarity: String, // Rarity level of the item
    rarity_color: String, // Color associated with the item's rarity
    price: Number // Current market price of the item
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;