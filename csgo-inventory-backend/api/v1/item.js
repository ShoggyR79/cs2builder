"use strict";

const Joi = require("joi");

module.exports = (app) => {
    // Schema for item info validation
    const schema = Joi.object({
        name: Joi.string().required(),
        classid: Joi.string().required(),
        icon_url: Joi.string().required(),
        icon_url_large: Joi.string().required(),
        type: Joi.string().required(),
        exterior: Joi.string().required(),
        weapon_type: Joi.string(),
        specific_type: Joi.string(),
        rarity: Joi.string().required(),
        rarity_color: Joi.string().required(),
        price: Joi.number()
    });

    /**
     * Create a new item
     * @param {req.body.name} Name of the item
     * @param {req.body.classid} Unique identifier for the item
     * @param {req.body.icon_url} URL for the item's icon
     * @param {req.body.icon_url_large} URL for the item's larger icon
     * @param {req.body.type} General type of the item (e.g., 'Gun', 'Knife', 'Glove', 'Agent')
     * @param {req.body.weapon_type} Categories like 'Pistol', 'Shotgun', etc. Only for Guns and Knives
     * @param {req.body.specific_type} The exact type of weapon like 'USP-S', 'AK-47'. Relevant for Guns and Knives
     * @param {req.body.rarity} Rarity level of the item
     * @param {req.body.rarity_color} Color associated with the item's rarity hex string
     * @param {req.body.price} Current market price of the item
     */
    app.post("/v1/item", async (req, res) => {
        let data;
        try {
            data = await schema.validateAsync(req.body, { stripUnknown: true });
            // do any deeper validation here
        } catch (err) {
            const message = err.details[0].message;
            return res.status(400).send({ error: message})
        }
        // Try to create the item or update it if it already exists
        // find using classid
        // if found, update
        // else, create
        try {
            let item = await app.models.Item.findOneAndUpdate(
                { classid: data.classid },
                { $set: data },
                { new: true, upsert: true }
            );
            res.status(201).send(item);
        } catch (err) {
            console.log(err);
            return res.status(500).send({ error: err });
        }
    });
}