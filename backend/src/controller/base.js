const express = require('express');
const baseSevice = require('../service/base');

module.exports = model => {
  const service = baseSevice(model);
  return {
    create: (req, res, next) =>
      service.create(req.body)
      .then(createdEntity => {
        res.status(201);
        res.json(createdEntity);
      })
      .catch(err => {
        res.json({
          message: 'Create error!',
          error: err
        });
        res.status(501);
      }),
    findAll: (req, res, next) =>
      service.findAll()
      .then(list => res.json(list))
      .catch(err => {
        res.json({
          message: 'FindAll error!',
          error: err
        });
        res.status(501);
      }),
    findOne: (req, res, next) =>
      service.findOne(req.params.id)
      .then(entity => res.json(entity))
      .catch(err => {
        res.json({
          message: 'FindOne error...!',
          error: err
        });
        res.status(501);
      }),
    updateOne: (req, res, next) => service.updateOne(req.params.id, req.body)
      .then(entity => res.json(entity))
      .catch(err => {
        res.json({
          message: 'UpdateOne error!',
          error: err
        });
        res.status(501);
      }),
    delete: (req, res, next) => service.delete(req.params.id)
      .then(entity => res.json(entity))
      .catch(err => {
        res.status(501);
        res.json({
          message: 'Delete error!',
          error: err
        });
      })
  }
}