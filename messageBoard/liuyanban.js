const express = require('express');
const formidable = require('formidable');
const db = require('./db.js');

let app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
console.time('demo')
app.get('/', (req, res, next) => {
    db.getAllCount('documents', (count) => {
        res.render('index', {
            pageAmount: Math.ceil(count / 5)

        });
    })
});
app.get('/du', (req, res, next) => {
    let page = parseInt(req.query.page);
    db.find('documents', {}, (docs) => {
        res.json({
            docs: docs
        });
    })
});
app.post('/submit', (req, res, next) => {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        console.log(fields);
        // console.log(typeof fields)
        // let a  = JSON.parse(fields);
        // console.log(a);
        // console.log(typeof a)
        db.insertOne('documents', fields);
        res.json({
            result: '1'
        })
    })

})

app.listen(8080);
console.timeEnd('demo')