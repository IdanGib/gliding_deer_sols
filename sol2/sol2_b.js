const { setImmediate } = require('timers');
// return Promise<{ done: boolean, page: string[], err: Error }>

const promiseResult = ({ done, page, err }) => {
  return new Promise(
    r => setImmediate(() => r({ 
      done, 
      page, 
      err
    }))
  );
}

async function* readAchievemetsPage(stream) {
  const PAGE_SIZE = 10;
  let page = [];
  let achievemet = '';
  try {
    for await (const value of stream) {
      if (value === ';') {
        achievemet && page.push(achievemet);
        achievemet = '';
        if (page.length === PAGE_SIZE) {
          yield promiseResult({ 
            page, err: null, done: false 
          });
          page = [];
        } 
      } else {
        achievemet += value;
      }
    }
    yield promiseResult({ 
      page, err: null, done: true 
    });
  } catch (err) {
    yield promiseResult({ 
      page: [], err, done: false 
    });
  }
}
module.exports = {
  readAchievemetsPage
}
