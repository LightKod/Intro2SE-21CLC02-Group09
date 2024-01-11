const express = require('express');
const router = express.Router();
const Controller = require('./course.controller');
router.get('/',Controller.getAllCourse)
router.post('/create',Controller.createCourse)
router.post('/addDeck',Controller.addDeck)
router.post('/addUser',Controller.getDecks)
router.post('/removeUser',Controller.removeUser)
router.post('/removeDeck',Controller.removeDeck)
router.get('/users',Controller.getUsers)//get users trong code
module.exports = router