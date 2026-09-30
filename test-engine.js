var S = require('./engine.js');
var pass = 0, fail = 0;
function t(name, got, want) {
  var ok = JSON.stringify(got) === JSON.stringify(want);
  if (ok) pass++; else { fail++; console.log('FAIL ' + name + ': got ' + JSON.stringify(got) + ' want ' + JSON.stringify(want)); }
}
t('profile green temp', S.profile('green').tempC, 75);
t('profile herbal boils', S.profile('herbal').tempC, 100);
t('profile unknown defaults black', S.profile('chai').tempC, 95);
t('green 3 steeps', S.steepPlan('green'), [{n:1,seconds:120},{n:2,seconds:150},{n:3,seconds:180}]);
t('oolong 5 steeps', S.steepPlan('oolong').length, 5);
t('oolong last steep', S.steepPlan('oolong')[4].seconds, 360);
t('puerh 6 steeps', S.steepPlan('puerh').length, 6);
t('herbal one steep', S.steepPlan('herbal'), [{n:1,seconds:300}]);
t('leaf green 250ml', S.leafGrams('green', 250), 2.5);
t('leaf green 350ml', S.leafGrams('green', 350), 3.5);
t('leaf oolong 500ml', S.leafGrams('oolong', 500), 8);
t('leaf rounds to half', S.leafGrams('green', 300), 3);
t('cool to 75', S.coolMinutes(75), 7);
t('cool to 80', S.coolMinutes(80), 5.5);
t('cool to 90', S.coolMinutes(90), 2.5);
t('cool to 100 none', S.coolMinutes(100), 0);
t('cold dilution to 75', S.coldWaterMl(250, 75), 114);
t('cold dilution to 80', S.coldWaterMl(250, 80), 83);
t('caffeine first steep', S.caffeinePct(1), 60);
t('caffeine second', S.caffeinePct(2), 25);
t('caffeine clamps high steeps', S.caffeinePct(9), 1);
t('caffeine zero below one', S.caffeinePct(0), 0);
t('fmt 90', S.fmtSec(90), '1:30');
t('fmt 300', S.fmtSec(300), '5:00');
console.log(pass + '/' + (pass + fail) + ' tests passed');
process.exit(fail ? 1 : 0);
