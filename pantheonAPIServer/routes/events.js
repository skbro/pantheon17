//jshint esversion:6, node: true

"use strict";

const express = require('express');
const router = express.Router();
const Event = require('../models/event');



router.post('/addNewEvent', (req, res, next) => {
  Event.getEventCount((err, data) => {
    if (err) {
      console.log(`Error fetchoing events count`);
      res.json({
        success: false,
        msg: `Something went wrong... please try again.`,
      });
    } else {
      let count = data+1;
      const newEvent = new Event({
        eventId: count,
        name: req.body.name,
        club: req.body.club,
        teamSize: req.body.teamSize,
        description: req.body.description,
        day: req.body.day,
        time: req.body.time,
        venue: req.body.venue,
        status: req.body.status,
        eventCoordinator1: {
          name: req.body.eventCoordinator1Name,
          phoneNumber: req.body.eventCoordinator1PhoneNumber,
        },
        eventCoordinator2: {
          name: req.body.eventCoordinator2Name,
          phoneNumber: req.body.eventCoordinator2PhoneNumber,
        },
      });

      Event.addNewEvent(newEvent, (err, callback) => {
        if (err) {
          console.error(`Error adding event
            ${ err }`);
          res.json({
            success: false,
            msg: `Error adding event`,
          });
        } else {
          res.redirect('https://pantheon17.in/admin897798/addEvent');
        }
      });
    }
  });
});


router.post('/editEvent', (req, res, next) => {
      const event = {
        eventId: req.body.id,
        name: req.body.name,
        club: req.body.club,
        teamSize: req.body.teamSize,
        description: req.body.description,
        day: req.body.day,
        time: req.body.time,
        venue: req.body.venue,
        status: req.body.status,
        eventCoordinator1: {
          name: req.body.eventCoordinator1Name,
          phoneNumber: req.body.eventCoordinator1PhoneNumber,
        },
        eventCoordinator2: {
          name: req.body.eventCoordinator2Name,
          phoneNumber: req.body.eventCoordinator2PhoneNumber,
        },
      };

      Event.editEvent(event, (err, callback) => {
        if (err) {
          console.error(`Error editing event
            ${ err }`);
          res.json({
            success: false,
            msg: `Error editing event`,
          });
        } else {
          res.redirect('https://pantheon17.in/admin897798/editEvent');
        }
      });
});

router.get('/getAllEvents', (req, res, next) => {
  Event.getAllEvents((err, data) => {
    if (err) {
      console.error(`Erorr fetching events`);
      res.json({
        success: false,
        msg: `Error fetching events`,
      });
    } else {
      res.send(data);
    }
  });
});

router.post('/getEventById', (req, res, next) => {
  Event.getEventById(req.body.id, (err, data) => {
    if (err) {
      console.error(`Error feching team`);
      res.json({
        success: false,
        msg: `Error fetching team`,
      });
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
