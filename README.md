## VSCode Arcade

Tired of coding? Well here are some destructive ways to vent your frustration!

Our project is for HacktheNorth 2020++! Give us a like at [Devpost](https://hackthenorth2020.devpost.com/)

## How to run it
1. Install it right here!
2. Open Command Palette (Ctrl-Shift-p on Windows, Cmd-Shift-p on Mac)
3. Open a file you're frustrated with
4. Search VS Arcade, and click Text Breakdown!
5. Have fun!

## Inspiration
The members of our team are computer science students who have all experienced difficulties in programming. From school assignments to personal projects, we have all encountered problems, bugs, and errors that would simply not go away. We wanted to create something that allowed frustrated programmers to channel their anger into, and this game is the perfect solution. It is a relaxing and satisfying way to destress that causes no physical damage or feelings of regret later on.
## What it does
This project is an interactive arcade, including games like the popular Atari Breakout. It is a VS Code Extension that encourages users to have fun while coding. In Atari Breakout, or our dubbed _VS Arcade: Textbreakdown_ The lines of code will consist of the blocks in the original Atari Breakout game. The player will be able to move around a rectangle to launch a ball up at their code, destroying it. The goal is to destroy all of the player's code, leaving nothing behind. **Nothing**. All that pent up frustration is also miraculously gone!
## How we built it
We built it using the VS Code extension API and its wealth of possibilities. Since it's built using electron, it allows for a webview - basically a browser as a desktop app. So we were able to use pure typescript as well as our favourite frontend libraries like matter.js for a physics engine in order to build this game. Combining with webpack to have a single source file made it a lot simpler, and finally publishing it through Azure's (technically Microsoft's) amazing platform for VS Code extensions
## Challenges we ran into
We ran into the challenge of learning how to use matter.js, as well as just simply using the tools we decided upon. Figuring out how to simply just use webpack properly and setting up npm for everyone had its challenges, but thanks to the experiences of some of group, we were able to get everyone started on the ground running in no time.
## Accomplishments that we're proud of
We are proud to have been able to create a new VS code extension that takes existing code and allows the user to interact with it in a game. We are also happy to have learned many new skills through the course of creating this project at Hack the North, and most importantly, for delivering a finished, working product.
## What we learned
Our team learned to work with the VS code extensions API and deployment process. We learned a lot about frontend development (with those web module bundlers!) and improved our skills in HTML and CSS to improve both UI and UX.
## What's next for VS Arcade Game
We would like to add additional mini games to the suite of VS Arcade Games to help programmers destress and vent frustration. As it is right now, VS Arcade is only in its beta testing, providing an MVP for what's next to come. Examples that we have started but did not have time to finish for this hackathon include catching falling code, a zero gravity game where you can throw your code around, and an exploding code game where you click code to make it explode.
