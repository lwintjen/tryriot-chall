const express = require('express');
const app = express();
const cron = require('node-cron');
const moment = require('moment');

const port = 3000;
const activeUsers = {}

app.get('/', (req, res) => {
    res.send('Welcome to TryRiot Backend Challenge!');
})

app.get('/metrics/:key/sum', (req, res) => {
  const key = parseInt(req.params.key, 10);
  if (activeUsers[key]) {
    if (activeUsers[key].length < 2) {
      return res.status(200).send({
        value: activeUsers[key][0].value
      });  
    }
    const sumValue = activeUsers[key].reduce((a, b) => a.value + b.value);
    return res.status(200).send({
      value: sumValue
    });
  }
  return res.status(404).send("Key not found");
})

app.post('/metrics/:key/:value', (req, res) => {
  const key = req.params.key;
  const value = parseInt(req.params.value, 10);
  if (activeUsers[key]) {
    activeUsers[key].push({value, time: moment()});
  }
  else {
    activeUsers[key] = [{value, time: moment()}];
  }
  return res.status(200).send({
    value: activeUsers[key][activeUsers[key].length - 1].value
  });
})


// cron job which will be executed every ten seconds to check if any user in a metric should be deleted (i.e. when the user has been active for more than an hour)
const scheduleCount = cron.schedule('*/10 * * * * *', () => {
  console.log('checking', activeUsers);
  Object.keys(activeUsers).forEach((key) => {
    activeUsers[key] = activeUsers[key].filter(t => moment().diff(t.time, 'hours') < 1);
    console.log(key, activeUsers[key]);
    if (!activeUsers[key]) {
      delete activeUsers[key];
    }
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
  scheduleCount.start();
})
