import { Button } from 'components';
import { SocketEvents } from 'enums';
import { Attempt, Game, User } from 'models';
import React, { useEffect, useState } from 'react';

import './styles.scss';
import classNames from 'classnames';
import socket from 'socket';

type Props = {
	game: Game;
	currentUser: User;
};

export const GameView: React.FC<Props> = ({ game, currentUser }) => {
	const [isPlayerTurn, setIsPlayerTurn] = useState(false);
	const [startValue] = useState(game.value);

	useEffect(() => {
		if (game.attemps.length > 0) {
			const lastPlayer = game.attemps[game.attemps.length - 1];
			setIsPlayerTurn(currentUser.id !== lastPlayer.user.id);
		} else {
			setIsPlayerTurn(currentUser.id === game.playerOne.id);
		}
	}, [game, currentUser]);

	const performGameMove = (number: number) => {
		socket.emit(SocketEvents.Turn, { gameId: game.id, user: currentUser, number } as Attempt);
	};

	const chatItem = (attempt: Attempt, index: number) => {
		const isPlayerOne = attempt.user.id === game.playerOne.id;

		return (
			<article key={index} className={classNames('chat-item', isPlayerOne && 'player-one', !isPlayerOne && 'player-two')}>
				<figure>
					<img src="https://via.placeholder.com/150" alt="Dummy pic" />
				</figure>
				<div>
					{attempt.number}
					{attempt.text}
					{attempt.newValue}
				</div>
			</article>
		);
	};

	const renderChatView = () => {
		return (
			<section className="game-view-chat">
				<h1>{startValue}</h1>
				{game.attemps.map(chatItem)}
			</section>
		);
	};

	return (
		<article className="game-view">
			<header>
				<h1>Hello {currentUser.username}, Greetings from Scoober team!</h1>
				<p>Win the game or win the job</p>
			</header>
			{renderChatView()}
			{isPlayerTurn && (
				<footer>
					<Button onClick={() => performGameMove(-1)}>-1</Button>
					<Button onClick={() => performGameMove(0)}>0</Button>
					<Button onClick={() => performGameMove(1)}>1</Button>
				</footer>
			)}
		</article>
	);
};
