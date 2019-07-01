'use strict';

var BowlingScorecard = function() {
  this.knockedDownPins = 0;
  this.frame = []
  this.total = []
};

BowlingScorecard.prototype.getCurrentRollScore = function() {
  return this.knockedDownPins;
};

BowlingScorecard.prototype.rollScore = function(knockedDownPins) {
  this.knockedDownPins = knockedDownPins;
  this.frameScore();

  if(this.strike()) {
    return;
  };
};

BowlingScorecard.prototype.frameScore = function() {
  this.frame.push(this.knockedDownPins);
};

BowlingScorecard.prototype.strike = function() {
  if (this.frame[0] === 10) {
    this.frame.push(0);
  };
};

BowlingScorecard.prototype.isFrameOver = function() {
  return this.frame.length === 2
};

BowlingScorecard.prototype.totalScore = function() {
  if(this.isFrameOver()) {
    this.total.push(this.frame);
    this.frame = []
  };
    return;
};
