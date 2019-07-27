const { PermissionLevels } = require("klasa");
const ownerIDs = ["255009837002260482", "209609796704403456"];

const checkDeveloper = async (message) => {
    if (ownerIDs.includes(message.author.id)) return true;
	return false;
};

module.exports = new PermissionLevels()
.add(0, () => true)
.add(10, async (message) => checkDeveloper(message));