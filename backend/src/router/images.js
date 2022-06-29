const express = require('express');
const fsp = require('fs').promises;
const { EOL } = require('os');

module.exports = (dir) => {
  const dirpath = `${__dirname}/../../${dir}`;
  const templateFileName = `${dirpath}/.dir.template.html`;
  const dotRegex = /^\./;
  const router = express.Router();
  router.use('/', express.static(dir, { dotfiles: 'ignore', index: false}));
  router.get('/', async (req, res, next) => {
    const dirlist = await fsp.readdir(dirpath, { withFileTypes: true});
    const template = await fsp.readFile(templateFileName, { encoding: 'utf-8'});
    const data = template.replace('<body>',
    `<body>${EOL}${
      dirlist
        .filter(e => !dotRegex.test(e.name) && e.isFile())
        .map(e => `<br><a href="${e.name}">${e.name}</a>`)
        .join(EOL)
    }`);
    res.send(data);
  });
  return router;
}