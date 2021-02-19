import { Button } from 'components';
import { SocketEvents } from 'enums';
import { Attempt, Game, User } from 'models';
import React from 'react';
import io from 'socket.io-client';
import './styles.scss';

type Props = {
	game: Game;
	currentUser: User;
};

const socket = io.connect('http://localhost:4000');

export const GameView: React.FC<Props> = ({ game, currentUser }) => {
	return (
		<article className="game-view">
			<header>
				<h1>Scoober team</h1>
				<p>Win the game or win the job</p>
			</header>
			<section className="game-view-chat"></section>
			<footer>
				<Button
					onClick={() => socket.emit(SocketEvents.Turn, { gameId: game.id, user: currentUser, number: -1 } as Attempt)}
				>
					-1
				</Button>
				<Button
					onClick={() => socket.emit(SocketEvents.Turn, { gameId: game.id, user: currentUser, number: 0 } as Attempt)}
				>
					0
				</Button>
				<Button
					onClick={() => socket.emit(SocketEvents.Turn, { gameId: game.id, user: currentUser, number: 1 } as Attempt)}
				>
					1
				</Button>
			</footer>
		</article>
	);
};
