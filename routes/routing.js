const fs = require ('fs');
const router = require ('express').Router();
const path = require ('path');

// get route for stored notes
router.get ('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'))
});

// post route for adding new notes
router.post ('/notes', (req, res) => {
    // parse current notes
    let currentNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    // declare new note
    let newNotes = req.body;
    // establish id of new note
    newNotes.id = currentNotes.length;
    // push new note to notes db file
    currentNotes.push(newNotes);

    fs.writeFile('./db/db.json', JSON.stringify(currentNotes), err => {
        if (err) throw err;
        console.log('Note Saved!');
        res.json(currentNotes);
    });
});

// delete saved notes
router.delete ('/notes/:id', (req, res) => {
    // parse current notes
    let currentNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    // find note by id
    let noteId = req.params.id;
    // splice note to be removed
    currentNotes.splice(noteId, 1);
    
    currentNotes.forEach((item, index) => {
        item.id = index;
    });
    
    fs.writeFile('./db/db.json', JSON.stringify(currentNotes), err => {
        if (err) throw err;
        console.log('Note Removed!');
        res.json(currentNotes);
    });
});

module.exports = router;