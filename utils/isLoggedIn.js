module.exports = function (req) {
  if (!req.cookies.session) return false
  return true
}