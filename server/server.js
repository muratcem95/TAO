//CONNECTIVITY SETUP
const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const moment = require('moment');
const _ = require('lodash');
const nodemailer = require('nodemailer');
var hbs = require('hbs');

const viewsPath = path.join(__dirname, '../views');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'muratcem95@gmail.com',
        pass: 'hqkjctddswrplwjm'
    }
});

app.set('views', path.join(__dirname, '../views'));  
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.use(express.static(viewsPath));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/home', (req, res) => {
    res.render('home/home.html');
});

app.post('/contactForm', (req, res) => {
    var mailOptions = {
        from: 'muratcem95@gmail.com',
        to: 'ashu.network.01@gmail.com',
        subject: `TAO Finding Your Way: Name: ${req.body.name}`,
        text: `Email: ${req.body.email}, Phone: ${req.body.phone}, Message: ${req.body.message}`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        };
    });
    
    res.redirect('/home');
});

//IO CONNECTIONS
io.on('connection', (socket) => {
    console.log('New user connected.');
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});
    
server.listen(port, () => console.log(`Server is up on port ${port}`));