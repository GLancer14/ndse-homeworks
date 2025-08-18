module.exports = (req, res) => {
  res.status(404);
  res.render("errors/404", { user: req.user || null });
};