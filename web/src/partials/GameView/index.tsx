import { Button } from 'components';
import { SocketEvents } from 'enums';
import { Attempt, Game, User } from 'models';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './styles.scss';
import classNames from 'classnames';

type Props = {
	game: Game;
	currentUser: User;
};

// TODO: Wrap the Url in environment variable
// TODO: create a hook for it to be re-usable
const socket = io.connect('http://192.168.0.5:4000');

export const GameView: React.FC<Props> = ({ game, currentUser }) => {
	const [isPlayerTurn, setIsPlayerTurn] = useState(false);
	const [startValue, setStartValue] = useState(0);

	useEffect(() => {
		if (game.attemps.length > 0) {
			const lastPlayer = game.attemps[game.attemps.length - 1];
			setIsPlayerTurn(currentUser.id !== lastPlayer.user.id);
		} else {
			setIsPlayerTurn(currentUser.id === game.playerOne.id);
		}
	}, [game, currentUser]);

	useEffect(() => {
		setStartValue(game.value);
	}, [game]);

	const chatItem = (attempt: Attempt, index: number) => {
		const isPlayerOne = attempt.user.id === game.playerOne.id;

		return (
			<article className={classNames('chat-item', isPlayerOne && 'player-one', !isPlayerOne && 'player-two')}>
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
					<Button
						onClick={() =>
							socket.emit(SocketEvents.Turn, { gameId: game.id, user: currentUser, number: -1 } as Attempt)
						}
					>
						-1
					</Button>
					<Button
						onClick={() =>
							socket.emit(SocketEvents.Turn, { gameId: game.id, user: currentUser, number: 0 } as Attempt)
						}
					>
						0
					</Button>
					<Button
						onClick={() =>
							socket.emit(SocketEvents.Turn, { gameId: game.id, user: currentUser, number: 1 } as Attempt)
						}
					>
						1
					</Button>
				</footer>
			)}
		</article>
	);
};
