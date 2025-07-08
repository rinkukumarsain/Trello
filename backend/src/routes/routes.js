const express = require('express');
const router = express.Router();

// Controllers
const userController = require('../controllers/userController');
const activityController = require('../controllers/activityController');
const boardController = require('../controllers/boardController');
const listController = require('../controllers/listController');
const cardController = require('../controllers/cardController');
const labelController = require('../controllers/labelController');

// Middleware
const auth = require('../middleware/auth');

// ================== User Routes ==================
router.post('/users', auth, userController.createUser);
router.get('/users', auth, userController.viewAllUser);
router.get('/users/:id', auth, userController.viewUserById);

// ================== Board Routes ==================
router.get('/boards', auth, boardController.viewBoard);
router.post('/boards', auth, boardController.allBoard);
router.put('/board/:boardId', auth, boardController.updateBoard);
router.delete('/board/:boardId', auth, boardController.deleteBoard);

// ================== List Routes ==================
router.post('/lists', auth, listController.createList);
router.get('/lists', auth, listController.viewList);
router.get('/lists/:boardId', auth, listController.Board);
router.put('/lists/:listId', auth, listController.updateList);
router.delete('/lists/:listId', auth, listController.deleteList);

// ================== Card Routes ==================
router.post('/card', auth, cardController.createCard);
router.get('/cards/:listId', auth, cardController.viewCard);
router.put('/cards/:cardsId', auth, cardController.updateCard);
router.delete('/cards/:cardId', auth, cardController.deleteCard);

// ================== Activity Routes ==================
router.post('/activities', auth, activityController.createActivity);
router.get('/activities/:boardId', auth, activityController.viewActivity);

// ================== Label Routes ==================
router.post('/label', auth, labelController.createLabel);
router.get('/label/:boardId', auth, labelController.getLabelByBoard);
router.put('/label/:labelId', auth, labelController.updateLabel);
router.delete('/label/:labelId', auth, labelController.deleteLabel);

module.exports = router;
