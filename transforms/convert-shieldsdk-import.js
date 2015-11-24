const updateImport = require("./util/update-import");
const toSource = require("./util/to-source");

module.exports = function (file, api) {
    var j = api.jscodeshift;
    var root = j(file.source);

    updateImport(
        j,
        root,
        {
            importSource: "@nfl/shield-sdk",
            newSource: "addons/ShieldSDK/index.js"
        }
    );

    return toSource(root, j);
};
