import { Button } from 'components';
import { Overlay } from 'partials';
import React from 'react';
import './styles.scss';

import Balloons from '../../assets/images/balloons.png';
import Cup from 'assets/images/cup.png';

import { useSocket } from 'hooks';

type Props = {
	isLoser?: boolean;
};

export const GameWinner: React.FC<Props> = ({ isLoser = false }) => {
	const { startNewGame, leaveGame } = useSocket();

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
