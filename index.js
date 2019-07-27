const { Canvas } = require('canvas-constructor');
const { resolve, join } = require('path');

const Client = require('./lib/structures/Client');
const { keys: { token } } = require('./config');

Client.use(require('klasa-dashboard-hooks'));

const client = new Client();

client.login(token);

Canvas.registerFont(resolve(join(__dirname, './assets/fonts/Ubuntu.ttf')), 'Ubuntu');
