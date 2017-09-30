//jshint esversion:6, node: true

"use stcict";

const mongoose = require('mongoose');

// Team Schema
const TeamSchema = mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  wins: [],
});

const Team = module.exports = mongoose.model('Team', TeamSchema);


module.exports.verifyTeam = function(eventName, teamName, callback) {
  Team.findOne({ teamName: teamName, eventName: eventName }).exec(callback);
};

module.exports.addTeam  = function(newTeam, callback) {
  newTeam.save(callback);
};

module.exports.getAllTeams = function(callback) {
  Applicant.find().exec(callback);
};
