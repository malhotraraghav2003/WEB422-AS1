/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Raghav Malhotra Student ID: 153547211 Date: May 19, 2023
*  cyclic link : https://tough-button-ray.cyclic.app
********************************************************************************/ 

const express = require("express");
const bodyparser = require("body-parser");
const app = express();
var cors = require('cors');
const tripsDB = require("./modules/tripsDB.js");
const db = new tripsDB();

const HTTP_PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
require('dotenv').config();

// API Routes

app.get("/", (req, res) => {
    res.json({ message: 'API Listening' });
});

app.post("/api/trips", (req, res) => {
    db.addNewTrip(req.body).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
    })
});

app.get("/api/trips", (req, res) => {
    var page = req.query.page;
    var perPage = req.query.perPage;
    var title = req.query.title;
    db.getAllTrips(page, perPage, title).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
    })
});

app.get("/api/trips/:_id", (req, res) => {
    db.getTripById(req.params._id).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
    })
});

app.put("/api/trips/:_id", (req, res) => {
    db.updateTripById(req.body, req.params._id).then((data) => {
        console.log("Successfully updated a trip!");
    }).catch((err) => {
        console.log(err);
    })
});

app.delete("/api/trips/:_id", (req, res) => {
    db.deleteTripById(req.params._id).then((data) => {
        console.log("Successfully deleted a trip!");
    }).catch((err) => {
        console.log(err);
    })
});

app.use(function(req,res){
    res.status(404).send("Resource not found");
});

db.initialize(process.env.MONGODB_CONN_STRING)
    .then(() => {
        app.listen(HTTP_PORT);
    }).catch((err) => {
        console.log(err);
    });
