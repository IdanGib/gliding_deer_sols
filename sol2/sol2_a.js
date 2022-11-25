async function readAchievemetsPage(stream, onPage, onDone, onError) {
  const PAGE_SIZE = 10;
  let page = [];
  try {
    for await (const value of stream) {
      if (value === ';') {
        achievemet && page.push(achievemet);
        achievemet = '';
        if (page.length === PAGE_SIZE) {
          onPage(page);
          page = [];
        }          
        achievemet = '';
      } else {
        achievemet += value;
      }
    }
    if (page.length > 0) {
      onPage(page)
    }
  } catch (e)  {
    onError(e);
  }
  onDone();
}

module.exports = {
  readAchievemetsPage
}