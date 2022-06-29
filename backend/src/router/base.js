/**
 * 
 * @param { mongoose.Schema.model } model
 * @param { object } options
 * @param { boolean | function } options.putEnable
 * @param { boolean | function } options.getOneEnable
 * @param { boolean | function } options.getAllEnable
 * @param { boolean | function } options.patchEnable
 * @param { boolean | function } options.deleteEnable
 * @returns an express Router
 */
module.exports = (model, {
  putEnable = true,
  getOneEnable = true,
  getAllEnable = true,
  patchEnable = true,
  deleteEnable = true,
} = {}) => {
  const controller = require('../controller/base')(model);
  const router = require('express').Router();
  //create
  if (putEnable)
    typeof putEnable === 'function' ?
    router.put('/', putEnable, (req, res, next) => controller.create(req, res, next)) :
    router.put('/', (req, res, next) => controller.create(req, res, next))
  //get one
  if (getOneEnable)
    typeof getOneEnable === 'function' ?
    router.get('/:id', getOneEnable, (req, res, next) => controller.findOne(req, res, next)) :
    router.get('/:id', (req, res, next) => controller.findOne(req, res, next));
  //get all
  if (getAllEnable)
    typeof getAllEnable === 'function' ?
    router.get('/', getAllEnable, (req, res, next) => controller.findAll(req, res, next)) :
    router.get('/', (req, res, next) => controller.findAll(req, res, next));
  //update
  if (patchEnable)
    typeof patchEnable === 'function' ?
    router.patch('/:id', patchEnable, (req, res, next) => controller.updateOne(req, res, next)) :
    router.patch('/:id', (req, res, next) => controller.updateOne(req, res, next));
  //delete
  if (deleteEnable)
    typeof deleteEnable === 'function' ?
    router.delete('/:id', deleteEnable, (req, res, next) => controller.delete(req, res, next)) :
    router.delete('/:id', (req, res, next) => controller.delete(req, res, next));
    
  return router;
}