const config = require("../../config/config.json");
"use strict"

module.exports = (app) => {
    require(`./${config.api_version}/item.js`)(app);
}