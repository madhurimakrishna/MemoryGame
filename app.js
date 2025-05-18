require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "memory_game"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: "secretKey",
  resave: false,
  saveUninitialized: true
}));

function isAuthenticated(req, res, next) {
  if (req.session.user) return next(); 
  res.redirect("/login");
}


app.get("/", (req, res) => res.redirect("/login"));

app.get("/login", (req, res) => res.render("login"));

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';

  db.query(sql, [email], async (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      return res.render('login', { error: 'Incorrect email or password' });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.render('login', { error: 'Incorrect email or password' });
    }

    req.session.user = user; // Store full user object in session
    res.redirect('/theme');
  });
});

app.get("/register", (req, res) => res.render("register"));

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hash], err => {
    if (err) throw err;
    res.redirect("/login");
  });
});

app.get("/theme", isAuthenticated, (req, res) => {
  res.render("theme");
});

app.post("/theme", isAuthenticated, (req, res) => {
  req.session.theme = req.body.theme;
  res.redirect("/game");
});

app.get("/game", isAuthenticated, (req, res) => {
  res.render("game", { theme: req.session.theme });
});

app.post("/score", isAuthenticated, (req, res) => {
  const { score } = req.body;
  db.query("INSERT INTO scores (user_id, score) VALUES (?, ?)", [req.session.user.id, score], err => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

app.get("/leaderboard", isAuthenticated, (req, res) => {
  db.query("SELECT u.name, s.score FROM scores s JOIN users u ON u.id = s.user_id ORDER BY s.score DESC LIMIT 10", (err, results) => {
    if (err) throw err;
    res.render("leaderboard", { scores: results });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
