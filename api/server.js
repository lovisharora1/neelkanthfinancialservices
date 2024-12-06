require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const http = require('http');
const port = 3020;

app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGODB_ATLAS_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Connection error:', err));

const User = require('./models/userModel');
const Review = require('./models/reviewModel');
const path = require('path');

app.get('/booka', (req, res) => {
    res.sendFile('public/booka.html');
});

app.get('/cusreview', (req, res) => {
    res.sendFile('public/cusreview.html');
});


app.post('/postappointment', async (req, res) => {
    const {name , email , phonenum , date, time , msg } = req.body
    const user = new User({
        name,
        email,
        phonenum,
        date,
        time,
        msg,
    })
    await user.save()
    res.send("Form Submission Successful")
})


app.post('/postreview', async (req, res) => {
    const {name , email , rating, review} = req.body
    const rev = new Review({
        name,
        email,
        rating,
        review
    })
    await rev.save()
    res.sendFile(path.join(__dirname, 'public/formsubmitted.html'));
})



app.listen(port, () => {
    console.log("Server started")
})
