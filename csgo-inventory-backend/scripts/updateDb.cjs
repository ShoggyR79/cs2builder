"use strict";
// const fetch = require('node-fetch');
const Item = require('../models/item.cjs');

const rariry_map = {
    'Consumer Grade': 1,
    'Industrial Grade': 2,
    'Mil-Spec Grade': 3,
    'Restricted': 4,
    'Classified': 5,
    'Covert': 6,
    'Contraband': 7,
    'Distinguished': 4,
    'Exceptional': 5,
    'Superior': 6,
    'Master': 7
}

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
                .replace('&#39The Doctor&#39', '')
                .replace(' (Factory New)', ' (FN)')
                .replace(' (Field-Tested)', ' (FT)')
                .replace(' (Minimal Wear)', ' (MW)')
                .replace(' (Well-Worn)', ' (WW)')
                .replace(' (Battle-Scarred)', ' (BS)')
            let data = {
                'name': name
            };
            data['name_normalized'] = name.replace(/[^a-zA-Z0-9-_]+/ig,'').toLowerCase();
            if(data['name'].endsWith('(FN)')){
                data['name_normalized'] += 'factorynew';
            }else if(data['name'].endsWith('(MW)')){
                data['name_normalized'] += 'minimalwear';
            }else if(data['name'].endsWith('(FT)')){
                data['name_normalized'] += 'fieldtested';
            }else if(data['name'].endsWith('(WW)')){
                data['name_normalized'] += 'wellworn';
            }else if(data['name'].endsWith('(BS)')){
                data['name_normalized'] += 'battlescarred';
            }
            data['type'] = it['type'];
            if(data['type'] !== 'Weapon' && data['type'] !== null && data['type'] !== 'Gloves') {
                continue;
            }
            console.log(data['name']);
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
                    } else if(data['specific_type'] === 'Desert Eagle') {
                        if(it['rarity'] === 'Stock' && it['exterior'] !== 'Not Painted'){
                            // skip weird desert eagle skins
                            continue;
                        }
                    }
                }
            } else if(data['type'] === 'Gloves'){
                if(data['name'].endsWith('(FN)')){
                    data['exterior'] = 'Factory New';
                    data['exterior_short'] = 'FN'
                }else if(data['name'].endsWith('(MW)')){
                    data['exterior'] = 'Minimal Wear';
                    data['exterior_short'] = 'MW'
                }else if(data['name'].endsWith('(FT)')){
                    data['exterior'] = 'Field-Tested';
                    data['exterior_short'] = 'FT'
                }else if(data['name'].endsWith('(WW)')){
                    data['exterior'] = 'Well-Worn';
                    data['exterior_short'] = 'WW'
                }else if(data['name'].endsWith('(BS)')){
                    data['exterior'] = 'Battle-Scarred';
                    data['exterior_short'] = 'BS'
                }
            }

            data['name'] = data['name']
                .replace(' (FN)', '')
                .replace(' (FT)', '')
                .replace(' (MW)', '')
                .replace(' (WW)', '')
                .replace(' (BS)', '')

            data['rarity'] = it['rarity'];
            data['rarity_color'] = it['rarity_color'];
            if(data['rarity'] in rariry_map){
                data['rarity_score'] = rariry_map[data['rarity']];
            }else{
                data['rarity_score'] = 0;
            }
            if(!('price' in it)){
                data['price'] = -1;
            } else {
                for(const [k, v] of Object.entries(it['price'])){
                    data['price'] = v['average'];
                    break;
                }
            }
            data['last_updated'] = Date.now();
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