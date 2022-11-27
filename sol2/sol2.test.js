const { readAchievemetsPage: readAchievemetsPageSolA } = require('./sol2_a');
const { readAchievemetsPage: readAchievemetsPageSolB } = require('./sol2_b');
const { ReadableStream } = require('node:stream/web');

function getStream(data, errorAt) {
  const stream = new ReadableStream({
    async start(controller) {
      const st = (index) => {
        setTimeout(() => {
          const a = data[index];
          if (a) {
            controller.enqueue(a);
            st(index + 1);
          } else if (!a) {
            controller.close();
          } else if(errorAt === a) {
            controller.error('Error!!!', index, a);
          }
        }, 100);
      }
      st(0);
    }
  });
  return stream;
}


async function testB(data) {
  console.log('>> test B no error');
  const asyncPaginator = readAchievemetsPageSolB(getStream(data));
  for await (const result of asyncPaginator) {
    console.log(result);
  }
}

async function testErrorB(data) {
  console.log('test B with error');
  const asyncPaginator = readAchievemetsPageSolB(getStream(data, 'e'));
  for await (const result of asyncPaginator) {
    console.log(result);
  }
}

const data = 'aaaa;b;cccc;d;eeee;dsadsf;g;hdsads;idsads;j;kdsadsa;l;m;n;o;p;aaaa;b;cccc;d;eeee;dsadsf;g;hdsads;idsads;j;kdsadsa;l;m;n;o;p;';
(async () => {
  await testB(data);
  await testErrorB(data);
})();
