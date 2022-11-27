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
            if(errorAt === a) {
              controller.error('Error!!!', index, a);
            } else {
              controller.enqueue(a);
              st(index + 1);
            }
          } else if (!a) {
            controller.close();
          }
        }, 100);
      }
      st(0);
    }
  });
  return stream;
}


async function testA(data) {
  return new Promise((r) => {
    console.log('>> test A no error');
    readAchievemetsPageSolA(getStream(data), 
    (page) => {
      console.log('page:', page);
    }, () => {
      console.log('done');
      r();
    }, (e) => {
      console.error(e);
      r();
    });
  });
}

async function testErrorA(data) {
  console.log('test A with error');
  return new Promise((r) => {
    readAchievemetsPageSolA(getStream(data, 'e'),
    (page) => {
      console.log('page:', page);
    }, () => {
      console.log('done');
      r();
    }, (e) => {
      console.error(e);
      r();
    });
  });
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
  await testA(data);
  await testErrorA(data);
  await testB(data);
  await testErrorB(data);
})();
