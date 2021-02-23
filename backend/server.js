const PORT = 4000;
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
	cors: {
		origin: '*',
	},
});
const { PLAYER, createNewGame, joinGame, findGame, turn, leaveGame, createBotGame } = require('./utils');

//Fake DB
let gamesState = [];

const onLeave = (state, id) => {
	const [newState, updatedGame] = leaveGame(state, id);
	gamesState = newState;
	if (updatedGame) {
		io.to(updatedGame.id).emit('game', updatedGame);
	}
};

io.on('connection', (socket) => {
	socket.on('newgame', ({ user, isSingleUser, isBotGame }) => {
		socket.userId = user.id;

		if (isBotGame) {
			let game = createBotGame();
			gamesState.push(game);
			socket.join(game.id);
			io.to(game.id).emit('game', game);

			const interval = setInterval(() => {
				const currentPlayer = game.turn === game.playerOne.id ? game.playerOne : game.playerTwo;
				const fakeAttempt = {
					gameId: game.id,
					user: currentPlayer,
					number: [-1, 0, 1][Math.floor(Math.random() * 3)],
				};

				gamesState = turn(gamesState, fakeAttempt);
				// Update game variable to determine next player turn
				game = findGame(gamesState, game.id);
				// Send updates to the client
				io.to(game.id).emit('game', game);

				if (game.winner != null) {
					clearInterval(interval);
					// Cleanup, remove the game from the fake db to not mess with other real human interactions
					gamesState = gamesState.filter((g) => g.id !== game.id);
				}
			}, 600);
			return;
		}

		if (isSingleUser) {
			const game = createNewGame({ user, isSingleUser });

			gamesState.push(game);

			socket.join(game.id);

			io.to(game.id).emit('game', game);
		} else {
			const startedGame = gamesState.find((game) => game.playerTwo === null && game.winner === null);

			if (!startedGame) {
				const game = createNewGame({ user });

				gamesState.push(game);
				socket.join(game.id);
				io.to(game.id).emit('game', game);
			} else {
				gamesState = joinGame(gamesState, startedGame.id, user);

				socket.join(startedGame.id);

				io.to(startedGame.id).emit('game', findGame(gamesState, startedGame.id));
			}
		}
	});

	socket.on('turn', (attempt) => {
		gamesState = turn(gamesState, attempt);

		const game = findGame(gamesState, attempt.gameId);

		io.to(attempt.gameId).emit('game', game);

		if (game.playerTwo && game.playerTwo.id === PLAYER.id) {
			setTimeout(() => {
				const fakeAttempt = {
					gameId: attempt.gameId,
					user: PLAYER,
					number: [-1, 0, 1][Math.floor(Math.random() * 3)],
				};

				gamesState = turn(gamesState, fakeAttempt);

				io.to(attempt.gameId).emit('game', findGame(gamesState, attempt.gameId));
			}, 600);
		}
	});

	socket.on('left', () => onLeave(gamesState, socket.userId));

	socket.on('disconnect', () => onLeave(gamesState, socket.userId));
});

http.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
