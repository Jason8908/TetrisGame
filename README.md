![](https://img.shields.io/github/languages/top/Jason8908/TetrisGame) ![](https://img.shields.io/github/languages/count/Jason8908/TetrisGame) ![](https://img.shields.io/github/repo-size/Jason8908/TetrisGame) ![](https://img.shields.io/github/v/release/Jason8908/TetrisGame) ![](https://img.shields.io/github/contributors/Jason8908/TetrisGame?color=gre)
# Tetris Demo
This project was finished under 24 hours over the span of five days. As the title implies, the purpose of this project was to create a replication of Tetris using only HTML elements and pure javascript code (with a **tiiiiny** bit of jQuery for events). The result is a perfectly working Tetris game with the ability for players to drop blocks and hold blocks. There is a functioning score is calculated by a base score plus some other value multiplied by the amount of lines cleared, as well as some number of points per block placed. 
![](https://i.imgur.com/aaKcKVd.png)
## What it Looks Like
The game has a dark background with text on the left and right sides of the board displaying "Hold" and "0" for the block held as well as the score respectively. On the right side, there is also a queue that displays what block will come next in the order of blocks. 
![](https://i.imgur.com/i9RMFQW.png)
# How it was Made
The entire Tetris board is comprised of a table with 20 rows and 10 columns. Each individual block has its own class which stores an array of all the coordinates of said block along with a number of useful methods in moving and rotating the block. The block is moved by changing settings for each individual portion of the entire block (each square) such as its coordinates, which are then used to change the class of the td cell as well as move the block down visually by changing the cell's background colour (I'm Canadian). Once we have that down, all that was left to do was to create an array to store the blocks in the queue, create a variable under the board class to store the held block, and store coordinates of the ghost block at the bottom within the instance of the block as well.
## Try it Out!
https://tetris.jason8908.repl.co ![](https://img.shields.io/website?down_color=lightgrey&down_message=offline&up_color=green&up_message=online&url=https%3A%2F%2Ftetris.jason8908.repl.co)
If the website is down, download the latest version's source code and run the HTML file...
## Copyright and License
Copyright (c) 2020 Jason Su. Developed with jQuery and pure javascript. All music used in this project is Royalty Free. This project is licensed under the terms of the MIT License. Please see the LICENSE file for full reference.

