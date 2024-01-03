"use strict";

const Joi = require("joi");
const Item = require('../../models/item.cjs');
const Loadout = require('../../models/loadout.cjs');

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
    'FAMAS': 'highTier',
    'Galil AR': 'highTier',
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
    'Negev': 'midTier',
    'M249': 'midTier',
    'MAC-10': 'midTier'
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
    'SCAR-20': 'CT',
    'MAC-10': 'T'
}

function generateID() {
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
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
            let skins = null;
            if(query['specific_type'] === 'Gloves'){
                skins = await Item.find(
                    { 'type': query['specific_type'] }
                );
            } else if(query['specific_type'] === 'Agent'){
                skins = await Item.find(
                    { 'type': query['specific_type'] }
                );
                skins = skins.filter(item =>
                    item.name !== 'StatTrak™ Swap Tool' &&
                    item.name !== 'Name Tag' &&
                    item.name !== 'Prototype Mikla Map Coin' &&
                    item.name !== 'Storage Unit')
            }
            else {
                skins = await Item.find(
                    { 'specific_type': query['specific_type'] }
                );
            }
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
            const name = query['specific_type'];
            const side = query['side'];
            let queriedResults = null;
            
            if(name === 'Knife'){
                queriedResults = await Item.find(
                    { 'exterior': 'Not Painted', 'weapon_type': 'Knife' }
                );
            } else {
                queriedResults = await Item.find(
                    { 'exterior': 'Not Painted', 'rarity': 'Stock' }
                );
            }
            let weapons = queriedResults;
            if(name !== 'Knife'){
                const category = weaponToCategoryMap[name];
                weapons = queriedResults.filter(
                    item => 
                        weaponToCategoryMap[item['name']] === category &&
                        (
                            (!(item['name'] in sideUniqueWeapons) || sideUniqueWeapons[item['name']] === side)
                        ));
            }
            res.status(200).send(weapons);
        } catch (err) {
            console.log(err);
            return res.status(500).send({ error: err });
        }
    });

    /**
     * Get A Loadout Given A Loadout ID
     */
    app.get("/v1/loadout/save/:loadout_id", async (req, res) => {
        try {
            const params = req.params;
            const loadout_id = params['loadout_id'];
            let loadout = await Loadout.findOne(
                { 'loadout_id': loadout_id }
            );
            // if not found, return null
            if(loadout !== null){
                // update last_accessed of the loadout
                loadout['last_accessed'] = Date.now();
                let item = await Loadout.findOneAndUpdate(
                    { 'loadout_id': loadout_id },
                    { $set: loadout },
                    { new: true, upsert: true }
                );
                res.status(200).send(loadout.loadout_object);
            } else {
                res.status(404).send({});
            }
            
        } catch (err) {
            console.log(err);
            return res.status(500).send({ error: err });
        }
    });

    /**
     * Create A Loadout Save
     */
    app.post("/v1/loadout/save", async (req, res) => {
        try {
            const submitted_loadout = req.body;
            let loadout_id = generateID();
            let query_loadout = await Loadout.findOne(
                { 'loadout_id': loadout_id }
            );
            // prevent collision (although very unlikely)
            while(query_loadout !== null){
                loadout_id = generateID();
                query_loadout = await Loadout.findOne(
                    { 'loadout_id': loadout_id }
                );
            }
            const data = {
                'loadout_id': loadout_id,
                'loadout_object': submitted_loadout,
                'last_accessed': Date.now()
            }
            let item = await Loadout.findOneAndUpdate(
                { 'loadout_id': loadout_id },
                { $set: data },
                { new: true, upsert: true }
            );
            // if not found, return null
            res.status(200).send(item);
        } catch (err) {
            console.log(err);
            return res.status(500).send({ error: err });
        }
    });
}