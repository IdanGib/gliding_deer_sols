async function* readAchievenentsPage(stream) {
  for await (const value of stream) {
  }
}

module.exports = {
  readAchievenentsPage
}