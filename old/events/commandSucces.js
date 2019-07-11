const { Event } = require('klasa');

class commandSuccesEvent extends Event {

	async run(message, command, params, response) {
    if(!command.executed) command.executed = 0;
    return command.executed += 1;
	}

}

module.exports = commandSuccesEvent;