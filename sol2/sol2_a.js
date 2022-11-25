async function readAchievemetsPage(stream, onPage, onDone, onError) {
  const P_S = 10;
  let page = [];
  let ach = '';
  try {
    for await (const value of stream) {
      if (value === ';') {
        page.push(ach);
        if (page.length === P_S) {
          onPage(page);
          page = [];
        }          
        ach = '';
      } else {
        ach += value;
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