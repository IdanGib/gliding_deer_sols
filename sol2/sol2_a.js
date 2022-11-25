const { ReadableStream } = require('node:stream/web');

function getStream() {
  const stream = new ReadableStream({
    async start(controller) {
      const time = 100;
      const data = 'aaaa;b;cccc;d;eeee;f;g;h;i;j;k;l;m;n;o;p;';
      const st = (index) => {
        setTimeout(() => {
          const a = data[index];
          if (a) {
            controller.enqueue(a);
            st(index + 1);
          } else {
            controller.close();
          }
        }, time);
      }
      st(0);
    }
  });
  return stream;
}

async function readAchievenentsPage(stream, onPage, onDone, onError) {
  const P_S = 3;
  let current = 0;
  let page = '';
  const digest = (rawPage) => {
    return rawPage.slice(0, -1).split(';');
  }
  try {
    for await (const value of stream) {
      if (value === ';') {
        current++;
      }
      page += value;
      if (current === P_S) {
        current = 0;
        onPage(digest(page));
        page = '';
      }
    }
    page && onPage(digest(page));
  } catch (e)  {
    onError(e);
  }
  onDone();
}


readAchievenentsPage(getStream(), (page) => {
  console.log('page:', page);
}, () => {
  console.log('done');
}, (err) => {
  console.error('error', err);
});

module.exports = {
  readAchievenentsPage
}