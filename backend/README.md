This is the server part of the challenge which can be optionally use by the candidate to complete the frontend technical challenge. This is using socket.io to serve the communication between clients. Clients can subscribe to different events to complete the requirements.

## Technical Challenge

### Goal

The Goal is to implement a game with two independent units – the players – communicating with each other using an API.

### Description

When a player starts, they incept a random (whole) number and send it to the second player as an approach of starting the game. The receiving player can then choose between adding one of {-1,0,1} in order to get to a number that is divisible by 3. The resulting whole number is then sent back to the original sender.

The same rules are applied until one player reaches the number 1 (after the division. See example below.) https://invis.io/JHN2247E9MK

Also feel free to use the provided design screens and assets.

For each "move", a sufficient output should be generated (mandatory: the added, and the resulting number).

Both players should be able to play automatically without user input. One of the players should optionally be adjustable by a user.

### Notes

- Each player runs on its own (independent programs, two browsers, web‐workers or a choice of your own).
- Communication via an API (REST, Sockets, WebRTC or a choice of your own).
- A player may not be available when the other one starts.
- Try to be platform independent, in other words the project must be runnable easily in every environment.
- Please share your project on GitHub and send us the link.

### Extras

Implementing a fancy UI using (and improving) provided design
Unit Tests
Using React with Redux
