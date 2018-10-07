const Client = require("./lib/structures/Client");
const { keys: { token } } = require("./config");

Client.use(require("klasa-dashboard-hooks"));

const client = new Client();

client.login(token);