import React from 'react';
import { GlobalState, GlobalValues } from 'store/store-types';

const initialGlobalState: GlobalState = {
	currentGame: null,
	currentUser: null,
};

const initialGlobalValues: GlobalValues = {
	...initialGlobalState,
	setCurrentGame: () => {},
	setCurrentUser: () => {},
};

const GlobalContext = React.createContext(initialGlobalValues);

export { initialGlobalState, initialGlobalValues };
export default GlobalContext;
