import { Attempt } from './attempt';
import { User } from './user';

export interface Game {
	id: string;
	playerOne: User;
	playerTwo?: User;
	value: number;
	startingNumber: number;
	turn: string;
	attemps: Attempt[];
	winner: string;
}
