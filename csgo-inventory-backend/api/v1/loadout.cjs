"use strict";

const Joi = require("joi");
const Item = require('../../models/item.cjs');

module.exports = (app) => {
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
            /**
             * T agent: 3608084516
             * CT agent: 3729335900
             * default knife (use both side) : 778387646
             */
            let defaultGuns = await Item.find(
                { 'exterior': 'Not Painted', 'rarity': 'Stock' }
            );
            let defaultTAgent = await Item.findOne(
                { 'classid': '3608084516' }
            );
            let defaultCTAgent = await Item.findOne(
                { 'classid': '3729335900' }
            );
            let defaultKnife = await Item.findOne(
                { 'classid': '778387646' }
            );
            let defaultTGloves = await Item.findOne(
                { 'classid': '2082566076' }
            );
            let defaultCTGloves = await Item.findOne(
                { 'classid': '2737939657' }
            );
            let nameMap = {};
            for(const gun of defaultGuns){
                nameMap[gun['name']] = gun;
            }
            let ctLoadout = {
                startingPistol: nameMap['P2000'],
                pistols: [
                    nameMap['P250'],
                    nameMap['Dual Berrettas'],
                    nameMap['CZ75-Auto'],
                    nameMap['Desert Eagle']
                ],
                midTier: [
                    nameMap['MP9'],
                    nameMap['Nova'],
                    nameMap['MAG-7'],
                    nameMap['M249'],
                    nameMap['Negev']
                ],
                highTier: [
                    nameMap['Famas'],
                    nameMap['M4A4'],
                    nameMap['AUG'],
                    nameMap['SSG 08'],
                    nameMap['AWP'],
                ],
                knife: defaultKnife,
                agent: defaultCTAgent,
                gloves: defaultCTGloves
            }

            let tLoadout = {
                startingPistol: nameMap['Glock'],
                pistols: [
                    nameMap['P250'],
                    nameMap['Dual Berrettas'],
                    nameMap['CZ75-Auto'],
                    nameMap['Desert Eagle']
                ],
                midTier: [
                    nameMap['Mac-10'],
                    nameMap['UMP-45'],
                    nameMap['MP5-SD'],
                    nameMap['Nova'],
                    nameMap['XM1014'],
                ],
                highTier: [
                    nameMap['Galil AR'],
                    nameMap['AK-47'],
                    nameMap['SG 553'],
                    nameMap['SSG 08'],
                    nameMap['AWP']
                ],
                knife: defaultKnife,
                agent: defaultTAgent,
                gloves: defaultTGloves
            }
            let builderState = {
                tSide: tLoadout,
                ctSide: ctLoadout 
            }
            res.status(200).send(builderState);
        } catch (err) {
            console.log(err);
            return res.status(500).send({ error: err });
        }
    });
}