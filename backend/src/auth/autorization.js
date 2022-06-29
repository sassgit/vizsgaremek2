module.exports = {
  rootEnable: (req, res, next) => {
    const role = req?.user?.role;
    if (role === 'root')
      next();
    else
      return res.sendStatus(403);
  },
  editEnable: (req, res, next) => {
    const role = req?.user?.role;
    if (role === 'root' || role === 'edit')
      next();
    else
      return res.sendStatus(403);
  },
  readEnable: (req, res, next) => {
    const role = req?.user?.role;
    if (role === 'root' || role === 'edit' || role === 'read')
      next();
    else
      return res.sendStatus(403);
  },
}
