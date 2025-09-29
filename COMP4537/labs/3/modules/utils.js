

function getDateTime() {
  const now = new Date()
  return now.toLocaleString()
}

module.exports = { getDateTime }
