"use strict";

import Joi from "joi";

export default (app) => {
    // Schema for item info validation
    const schema = Joi.object({
        name: Joi.string().required(),
        name_normalized: Joi.string().required(),
        classid: Joi.string().required(),
        icon_url: Joi.string().required(),
        icon_url_large: Joi.string().required(),
        type: Joi.string().required(),
        exterior: Joi.string().required(),
        weapon_type: Joi.string(),
        specific_type: Joi.string(),
        rarity: Joi.string().required(),
        rarity_color: Joi.string().required(),
        price: Joi.number(),
        exterior: Joi.string()
    });

    /**
     * Get Default Loadout
     */
    app.get("/v1/loadout/default", async (req, res) => {
        try {
            let data = await app.models.Item.find(
                { 'exterior': 'Not Painted' }
            );
            res.status(200).send(data);
        } catch (err) {
            console.log(err);
            return res.status(500).send({ error: err });
        }
    });
}