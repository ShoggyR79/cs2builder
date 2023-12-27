"use strict";

const Joi = require("joi");
const Item = require('../../models/item.cjs');

const weaponToCategoryMap = {
    'Glock-18': 'startingPistol',
    'P2000': 'startingPistol',
    'USP-S': 'startingPistol',
    'P250': 'pistol',
    'Five-SeveN': 'pistol',
    'Tec-9': 'pistol',
    'CZ75-Auto': 'pistol',
    'Dual Berettas': 'pistol',
    'Desert Eagle': 'pistol',
    'R8 Revolver': 'pistol',
    'MP9': 'midTier',
    'MP7': 'midTier',
    'UMP-45': 'midTier',
    'P90': 'midTier',
    'PP-Bizon': 'midTier',
    'FAMAS': 'midTier',
    'Galil AR': 'midTier',
    'Nova': 'midTier',
    'Sawed-Off': 'midTier',
    'MAG-7': 'midTier',
    'XM1014': 'midTier',
    'M4A4': 'highTier',
    'M4A1-S': 'highTier',
    'AK-47': 'highTier',
    'AUG': 'highTier',
    'SG 553': 'highTier',
    'AWP': 'highTier',
    'SSG 08': 'highTier',
    'G3SG1': 'highTier',
    'SCAR-20': 'highTier',
    'Negev': 'highTier',
    'M249': 'highTier'
};

const sideUniqueWeapons = {
    'Glock-18': 'T',
    'P2000': 'CT',
    'USP-S': 'CT',
    'Five-SeveN': 'CT',
    'Tec-9': 'T',
    'MP9': 'CT',
    'FAMAS': 'CT',
    'Galil AR': 'T',
    'Sawed-Off': 'T',
    'MAG-7': 'CT',
    'M4A4': 'CT',
    'M4A1-S': 'CT',
    'AK-47': 'T',
    'AUG': 'CT',
    'SG 553': 'T',
    'G3SG1': 'T',
    'SCAR-20': 'CT'
}

  

  
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
                    nameMap['Dual Berettas'],
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
                    nameMap['FAMAS'],
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
                startingPistol: nameMap['Glock-18'],
                pistols: [
                    nameMap['P250'],
                    nameMap['Dual Berettas'],
                    nameMap['CZ75-Auto'],
                    nameMap['Desert Eagle']
                ],
                midTier: [
                    nameMap['MAC-10'],
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

    /**
     * Get All Skins Of A Particular Gun
     */
    app.get("/v1/loadout/skins", async (req, res) => {
        try {
            const query = req.query;
            let skins = await Item.find(
                { 'specific_type': query['specific_type'], 'exterior': 'Factory New' }
            );
            res.status(200).send(skins);
        } catch (err) {
            console.log(err);
            return res.status(500).send({ error: err });
        }
    });

    /**
     * Get Alternatives To A Particular Gun
     */
    app.get("/v1/loadout/weapons", async (req, res) => {
        try {
            const query = req.query;
            const name = query['name'];
            const category = weaponToCategoryMap[name];
            let defaultGuns = await Item.find(
                { 'exterior': 'Not Painted', 'rarity': 'Stock' }
            );
            let weapons = defaultGuns.filter(
                item => 
                    weaponToCategoryMap[item['name']] === category &&
                    (
                        (!(item['name'] in sideUniqueWeapons) || !(name in sideUniqueWeapons)) || 
                        (sideUniqueWeapons[item['name']] === sideUniqueWeapons[name])
                    ));
            res.status(200).send(weapons);
        } catch (err) {
            console.log(err);
            return res.status(500).send({ error: err });
        }
    });
}