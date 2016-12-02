var getIo = require('../channel/bootstrap').io;

function notifyNewParticipant(poll, user, vote) {
	var message = {user: user, vote: vote };
	getIo().emit(poll.parent + ':newParticipant' , message);
}

function notifyNewVote(poll) {
	var message = { poll: poll};
	getIo().emit(poll.parent + ':vote', message);
}

exports.channel = {
	notifyNewParticipant: notifyNewParticipant,
	notifyNewVote: notifyNewVote
};