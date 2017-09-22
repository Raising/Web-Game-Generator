ROOT = __dirname+"/../modules/";

require(ROOT+'EventHandler.js');
PromiseChain = require(ROOT+'PromiseChain.js');
PYC = require(ROOT+'PrototipeClass.js');

var chai = require('chai');
var expect = chai.expect; 

should = require('should');
sinon = require('sinon');

PYC.Test('Player');
PYC.Test('Element');
PYC.Test('Element.Card');
PYC.Test('Element.Deck');
PYC.Test('Element.Board');
PYC.Test('Element.BoardCell');
