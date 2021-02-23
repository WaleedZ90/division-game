import { Button } from 'components';
import { Overlay } from 'partials';
import React, { useContext } from 'react';
import './styles.scss';

import Balloons from '../../assets/images/balloons.png';
import Cup from 'assets/images/cup.png';

import { useSocket } from 'hooks';
import GlobalContext from 'store/context/store.context';

type Props = {
	isLoser?: boolean;
};

export const GameWinner: React.FC<Props> = ({ isLoser = false }) => {
	const { startNewGame, leaveGame } = useSocket();
	const { currentGame } = useContext(GlobalContext);

	if (currentGame && currentGame.isBotGame) {
		return (
			<section className="game-winner">
				<Overlay />
				<div className="game-winner-dialogue">
					<h1>{currentGame.winner === '001' ? 'Computer Won!' : 'cpu Won!'}</h1>
					<div className="game-winner-actions">
						<Button onClick={startNewGame}>New game</Button>
						<Button color="secondary" onClick={leaveGame}>
							Leave game
						</Button>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="game-winner">
			<Overlay />
			<div className="game-winner-dialogue">
				<figure>
					<img src={!isLoser ? Cup : Balloons} alt={!isLoser ? 'Cup' : 'Balloons'} />
				</figure>
				<h1>{!isLoser ? 'You Won!' : 'You Lost!'}</h1>
				<div className="game-winner-actions">
					<Button onClick={startNewGame}>New game</Button>
					<Button color="secondary" onClick={leaveGame}>
						Leave game
					</Button>
				</div>
			</div>
		</section>
	);
};
