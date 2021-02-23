import { Button } from 'components';
import { Attempt } from 'models';
import React, { useContext, useEffect, useState } from 'react';

import './styles.scss';
import GlobalContext from 'store/context/store.context';
import { PlayerAttempt } from 'partials/PlayerAttempt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { GameWinner } from 'partials/GameWinner';
import { useSocket } from 'hooks';

export const GameView: React.FC = () => {
	const { currentGame, currentUser } = useContext(GlobalContext);
	const { leaveGame, performAttempt } = useSocket();
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
		performAttempt(number);
	};

	const renderChatView = () => {
		if (currentGame?.attemps.length === 0 && isPlayerTurn) {
			return (
				<section className="game-view-chat">
					<h1>Your turn! {currentGame.value}</h1>
				</section>
			);
		}

		if (!currentGame?.isBotGame && currentGame?.attemps.length === 0 && !isPlayerTurn) {
			return (
				<section className="game-view-chat">
					<h1>Wait for other player's turn!</h1>
				</section>
			);
		}

		return (
			<section className="game-view-chat">
				{currentGame?.attemps.map((attempt: Attempt, index) => (
					<PlayerAttempt key={index} attempt={attempt} isLastElement={currentGame.attemps[index + 1] == null} />
				))}
			</section>
		);
	};

	const renderGameWinner = () => {
		const gameWinner = currentGame?.winner === currentGame?.playerOne.id ? currentGame?.playerOne : currentGame?.playerTwo;
		return <GameWinner isLoser={gameWinner?.id !== currentUser?.id} />;
	};

	return (
		<article className="game-view">
			<header>
				<div>
					<h1>Hello {currentUser?.username}!</h1>
					<p>Win the game or win the job</p>
				</div>
				<div>
					<Button className={'game-view-leave-game-button'} color="secondary" onClick={leaveGame}>
						<ExitToAppIcon />
					</Button>
				</div>
			</header>
			{renderChatView()}
			<footer>
				{isPlayerTurn && (
					<React.Fragment>
						<Button onClick={() => performGameMove(-1)}>-1</Button>
						<Button onClick={() => performGameMove(0)}>0</Button>
						<Button onClick={() => performGameMove(1)}>1</Button>
					</React.Fragment>
				)}
			</footer>
			{currentGame && currentGame.winner && renderGameWinner()}
		</article>
	);
};
