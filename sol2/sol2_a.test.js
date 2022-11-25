const { ReadableStream } = require('node:stream/web');
const { readAchievenentsPage } = require('./sol2');

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

readAchievenentsPage(getStream(), (page) => {
  console.log('page:', page);
}, () => {
  console.log('done');
}, (err) => {
  console.error('error', err);
});