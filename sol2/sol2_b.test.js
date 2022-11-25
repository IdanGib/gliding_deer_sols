const { readAchievemetsPage } = require('./sol2_b');
const { ReadableStream } = require('node:stream/web');
function getStream() {
  const stream = new ReadableStream({
    async start(controller) {
      const data = 'aaaa;b;cccc;d;eeee;dsadsf;g;hdsads;idsads;j;kdsadsa;l;m;n;o;p;aaaa;b;cccc;d;eeee;dsadsf;g;hdsads;idsads;j;kdsadsa;l;m;n;o;p;';
      const st = (index) => {
        setTimeout(() => {
          const a = data[index];
          if (a) {
            controller.enqueue(a);
            st(index + 1);
          } else {
            controller.close();
          }
        }, 100);
      }
      st(0);
    }
  });
  return stream;
}


async function test() {
  const asyncPaginator = readAchievemetsPage(getStream());
  for await (const page of asyncPaginator) {
    console.log(page);
  }
}

test();