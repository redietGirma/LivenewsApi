const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const content = require('./routes/contents');
const reporter = require('./routes/reporter');
const router = require('./routes/reporter.js');
const auth = require('./routes/auth');




mongoose.connect('mongodb://localhost/LiveNews',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(()=> console.log('connected to mongodb!!'))
.catch(err => console.log('could not connect to mongodb', err));


app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

app.use('/news', content);
app.use('/reporter', reporter);
router.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    });





const port = process.env.port || 3300
app.listen(port, () => console.log(`running on port ${port}`));