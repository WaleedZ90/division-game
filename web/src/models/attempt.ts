import { User } from './user';
export interface Attempt {
	user: User;
	number: number;
	newValue: number;
	oldValue: number;
	text: string;
	gameId: string;
}
