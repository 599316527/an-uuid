var uuid = require('../index');
var log = require('an-log')('uuid');
var UUID_PATTERN = /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i;
var nbSamples = 1e4;

function assert(result, message) {
  if (!result) {
    log.error(message);
  } else {
    log(message);
  }
}


// generate nbSamples UUID, check pattern validity and calculate
// digits distribution.
var distribution = {};
for (var i = 0; i < nbSamples; i++) {
  var id = uuid();
  if (!UUID_PATTERN.test(id)) throw Error('wrong pattenr for '+id);
  var digits = id.replace(/-/g, '');
  for (j = 0; j < digits.length; j++) {
    var c = digits.charAt(j);
    distribution[c] = (distribution[c] || 0) + 1;
  }
}

var devianceLimit = 2*Math.sqrt(1/nbSamples);
log('deviance limit applied: ', Math.round(10000*devianceLimit)/100);
for (i = 0; i < 16; i++) {
  var symbol = i.toString(16);
  var occurence = distribution[symbol];

  // theorical probability for the occurence of this digit : 1/16 * 30 digits
  var theoricalOccurence = 30/16;

  // we add 1 because the first digit of the third group is 4 (stands for uuid v4)
  if (i == 4) theoricalOccurence += 1;

  // we add 1/4 because the first digit of the fourth group is 8,9,A ou B
  else if (i >= 8 && i <= 11) theoricalOccurence += 1/4;

  // We multiply bu the sample count in order to obtain number of occurence theorical probability
  theoricalOccurence*=nbSamples;

  // calcule the
  var deviance = Math.abs((occurence - theoricalOccurence)/theoricalOccurence);

  log[deviance < devianceLimit?'info':'error'](symbol, Math.round(10000*deviance)/100 + '%');
}

