const express = require('express');
const router = express.Router();
const Controller = require('./course.controller');
router.get('/',Controller.getAllCourse)
router.post('/create',Controller.createCourse)
router.post('/addDeck',Controller.addDeck)
router.post('/addUser',Controller.addUser)
router.post('/removeUser',Controller.removeUser)
router.post('/removeDeck',Controller.removeDeck)
router.get('/update',Controller.updateCourse)
router.get('/users',Controller.getUsers)//get users trong course
module.exports = router