const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loadoutSchema = new mongoose.Schema({
    loadout_id: {
        type: String,
        required: true
    }, // Name of the item
    loadout_object: Schema.Types.Mixed,
    last_updated: Date
});

const Loadout = mongoose.model('Loadout', loadoutSchema);

module.exports = Loadout;
