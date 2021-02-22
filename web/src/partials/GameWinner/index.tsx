import { Button } from 'components';
import { SocketEvents } from 'enums';
import { Overlay } from 'partials';
import React, { useContext } from 'react';
import socket from 'socket';
import './styles.scss';

import Balloons from '../../assets/images/balloons.png';
import Cup from 'assets/images/cup.png';

import GlobalContext from 'store/context/store.context';

type Props = {
	isLoser?: boolean;
};

export const GameWinner: React.FC<Props> = ({ isLoser = false }) => {
	const { resetState, currentUser } = useContext(GlobalContext);

	const startNewGame = () => {
		socket.emit(SocketEvents.NewGame, {
			user: currentUser,
			isSingleUser: currentUser?.isSingleUser,
		});
	};
	const leaveGame = () => {
		socket.emit(SocketEvents.Left);
		resetState();
	};

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
