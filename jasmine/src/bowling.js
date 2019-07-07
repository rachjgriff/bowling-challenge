'use strict';

var BowlingScorecard = function() {
  this.knockedDownPins = 0;
  this.frame = []
  this.total = []
  this.frameCount = 0
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

BowlingScorecard.prototype.cumScore = function() {
  var scores = this.total.flat();
  var cumScores = scores.reduce(function(accumulator, score) {
    return accumulator + score;
  }, 0);
  return cumScores
};

BowlingScorecard.prototype.counter = function() {
  return this.frameCount = this.total.length;
};

BowlingScorecard.prototype.previousFrame = function() {
  if(this.frameCount > 0) {
    return this.total[this.frameCount - 2];
  };
};

BowlingScorecard.prototype.isPreviousFrameStrike = function() {
  var frame = this.previousFrame();
  return frame[0] === 10 && frame[1] === 0;
};

BowlingScorecard.prototype.bonusStrike = function() {
  if(this.isPreviousFrameStrike()) {
      var frame = this.total[this.frameCount - 1]
      var bonusScore = frame.reduce(function(accumulator, score) {
        return accumulator + score;
      }, 0);
      this.previousFrame().push(bonusScore);
  };
    return;
};

BowlingScorecard.prototype.isPreviousFrameSpare = function() {
  var frame = this.previousFrame();
  var score = frame.reduce(function(accumulator, score) {
    return accumulator + score;
  }, 0);
  return frame[0] < 10 && score === 10;
};

BowlingScorecard.prototype.bonusSpare = function() {
  if(this.isPreviousFrameSpare()) {
    var bonusScore = this.total[this.frameCount - 1][0]
    this.previousFrame().push(bonusScore);
  };
};
