const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let comments = [
    "Richard1203 Says: We looked poor all over the pitch!",
    "Marek21 Says: But we won?!"
];

app.get('/', async function(req, res) {
    res.sendFile(__dirname + "/client/index.html");
});

app.get('/comment', function (req, resp){
    resp.send(comments);
});

app.get('/event', async function(req, res) {
    let response = await fetch("https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=133600");
    let body = await response.text();
    res.send(body);
});

app.get('/name', async function (req, resp){
    console.log (req.query);
    let name = req.query.name;

    let response = await fetch("https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=" + name);
    let body = await response.text();
    resp.send(body);
});

app.post('/add', function (req, resp){
    console.log(req.body);
    const com = req.body.user_comment;
    let coms = "You Said: " + com;
    comments.push(coms);
    resp.send("roger that")
});

module.exports = app;

