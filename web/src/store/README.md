# Global Store

This global state store was created to manage two properties:

-   **currentGame**, used to receive game updates from backend and notify all components
-   **currentUser**, used to store user info entered in the beginning

### In the Redux folder

It starts by the Context:

-   `store.context.ts`, this is where we initialize our context and define the shape of the functions
-   `store.reducer.ts`, this is where we define our reducer and what to do when the actions are dispatched

### GlobalStateProvider

-   We bootstrap our configurations made in `store.context.ts` & `store.reducer.ts` in GlobalStateProvider.tsx
-   We also define our actions here
-   This is the component where we expose in `index.tsx`

### consts

-   Is where we add all our consts, like action names "GlobalActionTypes"

### store-types

-   Is where all types and interfaces related to the redux settings are added.

---

## To define a new action

1. In the `store.context.ts`, define a new property in the `initialGlobalState`
2. Define a new action in `initialGlobalValues`
3. Setup all the types properly in `store-types.ts`
4. Add action name in `GlobalActionTypes`
5. in the `store.reducer.ts`, add a new switch case for the new action and do the corresponding implementation
6. In the `GlobalStateProvider.tsx`, define the dispatching function, and the property is ready to be used.

---

## Usage

To use the store:

```
export const MyComponent: React.FC = () => {
	const { currentUser } = useContext(GlobalContext);

	return (
		<article >
			{currentUser && <h1>Hello, {currentUser.username}</h1>}
		</article>
	);
};
```
