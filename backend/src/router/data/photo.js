const fsp = require('fs').promises;
const { join } = require('path');
const fileUpload = require('express-fileupload');

const Photo = require('../../model/photo');
const service = require('../../service/base')(Photo);
const access = {...require('../../auth/defaultacces')};

const storeDirectory = '../../../www/images';

const deleteEnable = access.deleteEnable;
const patchEnable = access.patchEnable;
const putEnable = access.putEnable;
access.putEnable = false;
access.deleteEnable = false;
access.patchEnable = (req, res, next) => {
  if (req.body) {
    req.body = { alt: req.body.alt };
  }
  if (patchEnable && typeof patchEnable === 'function')
    patchEnable(req, res, next);
  else
    next();
}
const router = require('../base')(Photo, access);


router.delete('/:id', deleteEnable, async (req, res, next) => {
  try {
    const id = req.params.id;
    const photo = await service.findOne(id);
    const deleted = await photo.delete();
    await fsp.unlink(join(__dirname, storeDirectory, photo.storedFileName))
    return res.json(deleted);
  } catch (err) {
    return res.status(501).json(err);
  }
})

router.use(fileUpload({ useTempFiles: true}));

router.post('/', putEnable, async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    const uploadFile = req.files.uploadFile;
    let storedFileName = uploadFile.name;
    let nameArray = storedFileName.split('.');
    const filenameWithOutExt = nameArray.slice(0, nameArray.length - 1).join('.');
    let alt = filenameWithOutExt;
    const ext = nameArray.length > 1 ? nameArray[nameArray.length-1] : '';
    let idx = 0;
    while (true) {
      if (!(await service.search({ storedFileName })).length)
        break;
      alt = `${filenameWithOutExt}_${++idx}`;
      storedFileName = ext ? `${alt}.${ext}` : alt;
    }
    const photo = await service.create({
      storedFileName,
      alt,
      fileSize: uploadFile.size
    });
    if (!photo)
      return res.status(501).send('Database Error');
    const uploadPath = join(__dirname, storeDirectory, storedFileName);
    uploadFile.mv(uploadPath, async (err) => {
      if (err) {
        await service.delete(photo._id);
        return res.status(500).json(err);
      } else
        res.json(photo);
    });
  } catch (err) {
    return res.status(501).json(err);
  }
});


module.exports = router;
