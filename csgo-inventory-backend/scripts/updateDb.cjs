"use strict";
// const fetch = require('node-fetch');
const Item = require('../models/item.cjs');

const updateDb = async () => {
    console.log("Updating DB");
    try {
        let response = await fetch("http://csgobackpack.net/api/GetItemsList/v2/", {method: 'GET'});
        response = await response.json();
        const items_list = response['items_list'];
        for(let [name, it] of Object.entries(items_list)){
            name = name
                .replace('&#39Blueberries&#39 ', '')
                .replace('&#39Two Times&#39', '')
                .replace('&#39Medium Rare&#39', '')
                .replace('&#39Dead Cold&#39', '')
                .replace('&#39Wet Sox&#39', '')
                .replace('&#39Tree Hugger&#39', '')
                .replace('&#39Van Healen&#39', '')
                .replace(' (Factory New)', '')
                .replace(' (Field-Tested)', '')
                .replace(' (Minimal Wear)', '')
                .replace(' (Well-Worn)', '')
                .replace(' (Battle-Scarred)', '')
            let data = {
                'name': name
            };
            data['name_normalized'] = name.replace(/[^a-zA-Z0-9-_]+/ig,'').toLowerCase();
            data['type'] = it['type'];
            if(data['type'] !== 'Weapon' && data['type'] !== null && data['type'] !== 'Gloves') {
                continue;
            }
            console.log(name);
            if(data['type'] === null) {
                if(name.startsWith('Patch') || name.startsWith('Sticker')){
                    continue;
                }
                if(name === 'Knife') {
                    data['type'] = 'Weapon';
                    data['weapon_type'] = 'Knife';
                    data['specific_type'] = 'Default Knife';
                } else {
                    data['type'] = 'Agent';
                }
            }
            data['classid'] = it['classid'];
            data['icon_url'] = it['icon_url'];
            data['icon_url_large'] = it['icon_url_large'];

            if(data['type'] === 'Weapon') {
                data['weapon_type'] = it['weapon_type'];
                // default skin = "Not Painted"
                data['exterior'] = it['exterior'];
                if(data['weapon_type'] === "Knife") {
                    data['specific_type'] = it['knife_type'];
                } else {
                    data['specific_type'] = it['gun_type'];
                    if(data['specific_type'] === 'USP-S' || data['specific_type'] === 'P2000'){
                        data['weapon_type'] = 'Starting Pistol';
                    }
                }
            } else if(data['type'] === 'Gloves'){
                data['exterior'] = it['exterior'];
            }

            data['rarity'] = it['rarity'];
            data['rarity_color'] = it['rarity_color'];
            if(!('price' in it)){
                data['price'] = 0;
            } else {
                for(const [k, v] of Object.entries(it['price'])){
                    data['price'] = v['average'];
                    break;
                }
            }
            let item = await Item.findOneAndUpdate(
                { classid: data['classid'] },
                { $set: data },
                { new: true, upsert: true }
            );
            console.log('Updated');
        }
    } catch (err) {
        console.log(err);
    }
}


module.exports = updateDb;