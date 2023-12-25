const mongoose = require('mongoose');
const Item = require('./item.cjs');

const pistolNumber = 4
const midTierNumber = 5
const highTierNumber = 5

const LoadoutStateSchema = new mongoose.Schema({
    startingPistol: {
        type: Item.schema,
        required: true
    },
    pistols: {
        type: [Item.schema],
        required: true,
        // validation for exactly 4 pistols
        validate: (pistols) => pistols.length === pistolNumber
    },
    midTier: {
        type: [Item.schema],
        required: true,
        // validation for exactly 5 mid tier weapons
        validate: (midTier) => midTier.length === midTierNumber
    },
    highTier: {
        type: [Item.schema],
        required: true,
        // validation for exactly 5 high tier weapons
        validate: (highTier) => highTier.length === highTierNumber
    },
    knife: {
        type: Item.schema,
        required: true
    },
    gloves: {
        type: Item.schema,
        required: true
    },
    agent: {
        type: Item.schema,
        required: true
    }
});

const builderStateSchema = new mongoose.Schema({
    tSide: {
        type: LoadoutStateSchema,
        required: true
    },
    ctSide: {
        type: LoadoutStateSchema,
        required: true
    }
})

const BuilderState = mongoose.model('BuilderState', builderStateSchema);

module.exports = BuilderState;