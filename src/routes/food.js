'use strict';

const express = require('express');
const router = express.Router();

const food = require('../models/food');

const foodInstance = new food(); 


router.get('/food', getfood);
router.get('/food/:id', getOnefood);
router.post('/food', createfood);
router.put('/food/:id', updatefood);
router.delete('/food/:id', deletefood);


function getfood(req, res) {
  // get all items
  let items = foodInstance.get();
  res.status(200).json(items);
}

function getOnefood(req, res) {
  let id = parseInt(req.params.id); // from the url its a string
  let oneItem = foodInstance.get(id);
  res.status(200).json(oneItem);
}

function createfood(req, res) {
  // use create Method from the class
  let obj = req.body;
  let newItem = foodInstance.create(obj);
  res.status(201).json(newItem);
}

function updatefood(req, res) {
  let id = parseInt(req.params.id);
  const obj = req.body;
  let updatedfood = foodInstance.update(id, obj);
  res.status(200).json(updatedfood);
}

function deletefood(req, res) {
  let id = parseInt(req.params.id);
  let deleted = foodInstance.delete(id);
  let msg = deleted ? 'Item is deleted': 'Item was not Found';
  let statusCode = deleted ? 202 : 204;
  res.status(statusCode).json({
    msg: msg,
    deleted: deleted,
  });
}


module.exports = router;