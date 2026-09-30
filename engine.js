/* TeaMath engine - tea brewing math. Pure functions, no DOM. */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.TeaMath = api;
}(typeof self !== 'undefined' ? self : this, function () {

  // Western mug brewing profiles: temp, first steep, added time per resteep, max steeps.
  var PROFILES = {
    green:  { tempC: 75,  firstSec: 120, deltaSec: 30, maxSteeps: 3, note: 'never boiling - bitter in one sip' },
    white:  { tempC: 80,  firstSec: 180, deltaSec: 60, maxSteeps: 3, note: 'patient leaf - rewards the wait' },
    oolong: { tempC: 90,  firstSec: 180, deltaSec: 45, maxSteeps: 5, note: 'the resteep champion - later steeps bloom' },
    black:  { tempC: 95,  firstSec: 180, deltaSec: 60, maxSteeps: 2, note: 'one strong resteep at most' },
    puerh:  { tempC: 95,  firstSec: 150, deltaSec: 30, maxSteeps: 6, note: 'rinse once with hot water first' },
    herbal: { tempC: 100, firstSec: 300, deltaSec: 60, maxSteeps: 1, note: 'one steep only - the second is tinted water' }
  };

  function profile(type) {
    return PROFILES[type] || PROFILES.black;
  }

  // Leaf grams for a mug size: grams per 250ml by type, rounded to 0.5g.
  var GRAMS_PER_250 = { green: 2.5, white: 3, oolong: 4, black: 3, puerh: 4, herbal: 2.5 };

  function leafGrams(type, ml) {
    var g = (GRAMS_PER_250[type] || 3) * (ml / 250);
    return Math.round(g * 2) / 2;
  }

  // Steep schedule: [{n, seconds}] for every steep the leaf can give.
  function steepPlan(type) {
    var p = profile(type);
    var plan = [];
    for (var n = 1; n <= p.maxSteeps; n++) {
      plan.push({ n: n, seconds: p.firstSec + (n - 1) * p.deltaSec });
    }
    return plan;
  }

  // Minutes from a rolling boil to target temp in a room-temp kitchen (Newton's law, k=0.055).
  function coolMinutes(targetC, roomC) {
    var room = roomC === undefined ? 22 : roomC;
    if (targetC >= 100) return 0;
    var min = Math.log((100 - room) / (targetC - room)) / 0.055;
    return Math.round(min * 2) / 2;
  }

  // Cold tap water (20C) to add to boiling water to land on target temp.
  function coldWaterMl(mlBoiling, targetC, coldC) {
    var cold = coldC === undefined ? 20 : coldC;
    return Math.round(mlBoiling * (100 - targetC) / (targetC - cold));
  }

  // Rough share of the leaf's caffeine by steep number.
  var CAFFEINE = [60, 25, 10, 4, 1, 1];

  function caffeinePct(steepN) {
    if (steepN < 1) return 0;
    return CAFFEINE[Math.min(steepN, CAFFEINE.length) - 1];
  }

  function fmtSec(s) {
    var m = Math.floor(s / 60), r = s % 60;
    return m + ':' + (r < 10 ? '0' : '') + r;
  }

  return {
    profile: profile,
    leafGrams: leafGrams,
    steepPlan: steepPlan,
    coolMinutes: coolMinutes,
    coldWaterMl: coldWaterMl,
    caffeinePct: caffeinePct,
    fmtSec: fmtSec
  };
}));
