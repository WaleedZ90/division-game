import { Button } from 'components';
import { SocketEvents } from 'enums';
import { Attempt } from 'models';
import React, { useContext, useEffect, useState } from 'react';

import './styles.scss';
import classNames from 'classnames';
import socket from 'socket';
import GlobalContext from 'store/context/store.context';

import PersonSharpIcon from '@material-ui/icons/PersonSharp';
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';

export const GameView: React.FC = () => {
	const { currentGame, currentUser } = useContext(GlobalContext);

	const [isPlayerTurn, setIsPlayerTurn] = useState(false);
	const [startValue] = useState(currentGame?.value);

	useEffect(() => {
		if (currentGame && currentGame?.attemps.length > 0) {
			const lastPlayer = currentGame?.attemps[currentGame?.attemps.length - 1];
			setIsPlayerTurn(currentUser?.id !== lastPlayer.user.id);
		} else {
			setIsPlayerTurn(currentUser?.id === currentGame?.playerOne.id);
		}
	}, [currentGame, currentUser]);

	const performGameMove = (number: number) => {
		socket.emit(SocketEvents.Turn, { gameId: currentGame?.id, user: currentUser, number } as Attempt);
	};

	const chatItem = (attempt: Attempt, index: number): JSX.Element => {
		const isPlayerOne = attempt.user.id === currentGame?.playerOne.id;

		return (
			<article key={index} className={classNames('chat-item', isPlayerOne && 'player-one', !isPlayerOne && 'player-two')}>
				<div className="chat-item-header">
					<figure>
						{isPlayerOne && <PersonSharpIcon />}
						{!isPlayerOne && <PersonOutlineSharpIcon />}
						<figcaption>{isPlayerOne ? currentGame?.playerOne.username : currentGame?.playerTwo.username}</figcaption>
					</figure>
					<p className="player-input">{attempt.number}</p>
				</div>
				<div className="chat-item-calculations">
					<p>{attempt.text}</p>
					<p>{attempt.newValue}</p>
				</div>
			</article>
		);
	};

	const renderChatView = () => {
		return (
			<section className="game-view-chat">
				<h1>{startValue}</h1>
				{currentGame?.attemps.map(chatItem)}
			</section>
		);
	};

	if (currentGame && currentGame.winner) {
		const gameWinner = currentGame.winner === currentGame.playerOne.id ? currentGame.playerOne : currentGame.playerTwo;
		return (
			<div>
				<h1>{gameWinner.username} Wins!</h1>
				<Button
					onClick={() => {
						socket.emit(SocketEvents.NewGame, {
							user: currentUser,
							isSingleUser: currentUser && currentUser?.isSingleUser,
						});
					}}
				>
					New game
				</Button>
			</div>
		);
	}

	return (
		<article className="game-view">
			<header>
				<div>
					<h1>Hello {currentUser?.username}, Greetings from Scoober team!</h1>
					<p>Win the game or win the job</p>
				</div>
				<div>
					<Button color="secondary" onClick={() => socket.emit(SocketEvents.Left)}>
						Leave game
					</Button>
				</div>
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
