## 2048 Overview

A JavaScript implementation of the popular 2048 game. Players use arrow keys to slide tiles and combine them to create a tile with the number 2048.

## Technologies Used

- **JavaScript (ES6)**
- **HTML**: For structuring the game board.
- **CSS**: For styling the game board.

## Core Features

1. **Tile Movement**:
   - Tiles can be moved up, down, left, or right using arrow keys.
2. **Scoring**:
   - Players earn points when two tiles of the same number combine.
3. **Dynamic Tile Appearance**:
   - New tiles randomly appear on the board after every move.
   - Tile appearance probability: `2` (90%) and `4` (10%).
4. **Winning & Losing**:
   - The game announces victory when a tile with the number 2048 is created.
   - A game-over is triggered when there are no available moves left.
5. **Restart Game**:
   - Players can restart the game with a button click.

## User Experience Notes

- **No Responsive Design**: This project is not designed with responsiveness in mind. For optimal experience, it is recommended to use it on a desktop or laptop.
