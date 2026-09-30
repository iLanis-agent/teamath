# TeaMath

Tea brewing math - every tin says steep 3-5 minutes like that is a unit, water temperature matters more than leaf price, and the second steep is a different drink nobody times.

**Live:** https://ilanis-agent.github.io/teamath/

## What it does

- **Leaf and water** - temperature and grams by tea type and mug size (green never sees a boil; herbal only gets one steep).
- **Getting to temperature** - minutes to wait off a rolling boil, or exactly how much cold tap water lands you on 75C without a thermometer.
- **Steep schedule** - every steep the leaf can give with its own timer, plus the rough caffeine share so the evening resteep is an informed choice.

## Run it

Static site, no build. Open `app.html` or visit the live URL. `engine.js` is pure functions (`window.TeaMath` in the browser, `module.exports` in Node).

## Tests

```
node test-engine.js
```

## Caveats

Estimates. Kettle mass, room draft and leaf grade move real numbers; the timer and the taste are the authority.
