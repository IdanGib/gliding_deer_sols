async function* readAchievemetsPage(stream) {
  const PAGE_SIZE = 10;
  let page = [];
  let achievemet = '';
  for await (const value of stream) {
    if (value === ';') {
      achievemet && page.push(achievemet);
      achievemet = '';
      if (page.length === PAGE_SIZE) {
        yield new Promise((resolve) => {
          setTimeout(() => {
            resolve(page);
          }, 0);
        });
        page = [];
      } 
    } else {
      achievemet += value;
    }
  }
  if (page.length > 0) {
    yield new Promise((resolve) => {
      setTimeout(() => {
        resolve(page);
      }, 0);
    });
    yield page;
  }
}

module.exports = {
  readAchievemetsPage
}