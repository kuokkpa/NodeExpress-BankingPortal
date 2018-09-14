const fs = require('fs');
const path = require('path');
const express = require('express');
const { accounts, users, writeJSON } = require('./data');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Account Summary',
        accounts: accounts
    });
});

app.get('/savings', (req, res) => {
    res.render('account', { 
        account: accounts.savings
    });
});

app.get('/checking', (req, res) => {
    res.render('account', { 
        account: accounts.checking
    });
});

app.get('/credit', (req, res) => {
    res.render('account', { 
        account: accounts.credit
    });
});

app.get('/transfer', (req, res) => {
    res.render('transfer');
});

app.post('/transfer', (req, res) => {
    accounts[req.body.from].balance -= req.body.amount;
    accounts[req.body.to].balance += Number(req.body.amount);
    writeJSON();
    res.render('transfer', {message: 'Transfer Completed'});
});

app.get('/payment', (req, res) => {
    res.render('payment', { 
        account: accounts.credit
    });
});

app.post('/payment', (req, res) => {
    accounts.credit.balance -= req.body.amount;
    accounts.credit.available += Number(req.body.amount);
    writeJSON();
    res.render('payment', {
        account: accounts.credit,
        message: 'Payment Successful'}
    );
});

app.get('/profile', (req, res) => {
    res.render('profile', { 
        user: users[0]
    });
});

app.listen(3000, () => {
    console.log("Running on port 3000");
});
