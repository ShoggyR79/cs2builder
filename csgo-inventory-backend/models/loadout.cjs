const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loadoutSchema = new mongoose.Schema({
    loadout_id: {
        type: String,
        required: true
    },
    loadout_object: Schema.Types.Mixed,
    last_accessed: Date
});

const Loadout = mongoose.model('Loadout', loadoutSchema);

module.exports = Loadout;
