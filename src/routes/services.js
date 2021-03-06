const express = require('express');
const router = express.Router();
const { accounts, writeJSON } = require('../data');

router.get('/transfer', (req, res) => {
    res.render('transfer');
});

router.post('/transfer', (req, res) => {
    accounts[req.body.from].balance -= req.body.amount;
    accounts[req.body.to].balance += Number(req.body.amount);
    writeJSON();
    res.render('transfer', {message: 'Transfer Completed'});
});

router.get('/payment', (req, res) => {
    res.render('payment', { 
        account: accounts.credit
    });
});

router.post('/payment', (req, res) => {
    accounts.credit.balance -= req.body.amount;
    accounts.credit.available += Number(req.body.amount);
    writeJSON();
    res.render('payment', {
        account: accounts.credit,
        message: 'Payment Successful'}
    );
});

module.exports = router;
