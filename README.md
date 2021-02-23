# The division game

### Features supported in this game:

- Single player
- Two players
- CPU vs CPU
- Full mobile compatibility

### To start a single player game:

- Type a name in the welcome screen
- Check "Playing alone" checkbox
- A single player game should start

### To start a two player game:

- Just type a name and join
- The backend server will join you with another player that's also requesting to play with another player
- It can be easily tested by opening two browser instances

### To start a bot game:

- Just check Bot game
- A game between Two CPUs should start.

### Changes made to the provided backend code:

- calculateNewValue, to return Math.floor numbers because almost all the numbers had decimals which ended the game too soon, I just wanted it to last longer.
- Handled the CPU vs CPU in the backend.

## Running the application

To run the application you will need to open two different terminal instances for both the `web` and `backend`.

- one pointing at `web`
- and another one pointing at `backend`.

### Web

- `npm install`
- `npm start`

For the Web application to change the url that connects to the backend server.
Please do so in the `.env.development` file.

The current url is `http://localhost:4000`

This would allow you to run applications on your local machine only, if you want to play with others on the same network with different machines, you will need to provide the IP Address instead of `localhost`

### Backend

- `npm install`
- `npm start`
