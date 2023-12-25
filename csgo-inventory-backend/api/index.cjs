const config = require("../../config/config");
"use strict"

module.exports = (app) => {
    require(`./${config.api_version}/item.cjs`)(app);
}