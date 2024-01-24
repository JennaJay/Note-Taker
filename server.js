const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();
const notes = require('./db/db.json')
//const routes = require('./routes')

const PORT = process.env.PORT  ||  3001;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res)  => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get('/api/notes', (req, res)  => {
    res.json(notes)
});

app.post('/api/notes', (req, res)  => {
    req.body.id = uuidv4()
    notes.push(req.body)
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
    res.json(notes)
});

app.delete('/api/notes/:id', (req, res)  => {
    for (let index = 0; index < notes.length; index++) {
      if(notes[index].id == req.params.id) {
        notes.splice(index, 1)
      } 
        
    }
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
    res.json(notes)
});
// app.use(routes)
app.listen(PORT, () => console.log('http://localhost:' + PORT));

