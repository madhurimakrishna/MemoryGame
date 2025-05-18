# MemoryGame
Memory Game with Personalized Themes is a web-based game built using HTML, CSS, JavaScript for the frontend and Node.js with Express for the backend. It features theme selection, user authentication, scoring, and a leaderboard system, with all user data and scores managed using MySQL Workbench as the relational database.

Features
🃏 Customizable Themes: Choose from a variety of themes (Animals, Nature, Movies).
⏱ Score Tracking: The score is displayed and updated in real-time as the user plays.
🏆 Leaderboard: View the top scores and challenge friends.
🔒 User Authentication: Users can log in or register to save their progress.
⏳ Timer: Keep track of time taken to finish the game.

Tech Stack
👨‍💻 Frontend: HTML, CSS, Bootstrap
🖥 Backend: Node.js, Express
🗃 Database: MySQL
🔑 Authentication: Passport.js (or any other authentication middleware)
🎮 Game Logic: JavaScript


Installation
1. Clone the repository:
    ->bash
   git clone https://github.com/your-username/memory-game.git
   

2. Install dependencies:
   Navigate to the project folder and install dependencies using npm:
   ->bash
   npm install
   

3. Set up MySQL database:
   - Create a MySQL database using MySQL Workbench.
   - Import the necessary SQL schema or tables to store user scores and game settings.

4. Configure environment variables:
   - Add your database credentials and other configurations to `.env` file.

5. Start the server:
   ->bash
   npm start
   

   The server should now be running on `http://localhost:3000`.

   
Usage
1. Start the Game: Once logged in, select a theme and start playing the memory card game.
2. Track Progress: View your score after the game and compare it with others on the leaderboard.
3. Leaderboard: View the top scores and challenge your friends!
Contributing
1. Fork the repository
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
👨‍💻 Bootstrap for the responsive UI design
🖥 Node.js and Express for building the backend
🗃 MySQL for storing user and game data
