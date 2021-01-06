const express = require('express');
const path = require('path');

const app = express();

const PROJECT_NAME = 'WebQuizEngine';
const DIR_NAME = __dirname + '/dist/' + PROJECT_NAME;

app.use(express.static(DIR_NAME));
app.get('/*', function(req, res) {
    res.sendFile(path.join(DIR_NAME + '/index.html'));
});

app.listen(process.env.PORT || 8080);