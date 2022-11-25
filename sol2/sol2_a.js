async function readAchievenentsPage(stream, onPage, onDone, onError) {
  const P_S = 3;
  let current = 0;
  let page = [];
  let ach = '';
  try {
    for await (const value of stream) {
      if (value === ';') {
        current++;
        page.push(ach);
        ach = '';
      } else {
        ach += value;
      }
      if (current === P_S) {
        current = 0;
        ach = '';
        onPage(page);
        page = [];
      }
    }
    if (ach) {
      onPage([...page, ach])
    }
  } catch (e)  {
    onError(e);
  }
  onDone();
}

module.exports = {
  readAchievenentsPage
}