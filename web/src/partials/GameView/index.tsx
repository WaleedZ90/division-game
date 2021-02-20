import { Button } from 'components';
import { SocketEvents } from 'enums';
import { Attempt } from 'models';
import React, { useContext, useEffect, useState } from 'react';

import './styles.scss';
import socket from 'socket';
import GlobalContext from 'store/context/store.context';
import { PlayerAttempt } from 'partials/PlayerAttempt';

export const GameView: React.FC = () => {
	const { currentGame, currentUser, resetState } = useContext(GlobalContext);

	const [isPlayerTurn, setIsPlayerTurn] = useState(false);

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

	const renderChatView = () => {
		if (currentGame?.attemps.length === 0 && isPlayerTurn) {
			return (
				<section className="game-view-chat">
					<h1>You turn! {currentGame.value}</h1>
				</section>
			);
		}

		if (currentGame?.attemps.length === 0 && !isPlayerTurn) {
			return (
				<section className="game-view-chat">
					<h1>Wait for other player's turn!</h1>
				</section>
			);
		}

		return (
			<section className="game-view-chat">
				{currentGame?.attemps.map((attempt: Attempt, index) => (
					<PlayerAttempt key={index} attempt={attempt} />
				))}
			</section>
		);
	};

	if (currentGame && currentGame.winner) {
		const gameWinner = currentGame.winner === currentGame.playerOne.id ? currentGame.playerOne : currentGame.playerTwo;
		return (
			<section className="game-winner">
				<h1>{gameWinner?.username} Wins!</h1>
				<div className="game-winner-actions">
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
					<Button
						color="secondary"
						onClick={() => {
							socket.emit(SocketEvents.Left);
							resetState();
						}}
					>
						Leave game
					</Button>
				</div>
			</section>
		);
	}

	return (
		<article className="game-view">
			<header>
				<div>
					<h1>Hello {currentUser?.username}!</h1>
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
