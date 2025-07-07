// routes 
 
const express =require('express');
 const router = express.Router();
 const userController = require('../controllers/userController');
 const activityController = require('../controllers/activityController');
 const boardController = require('../controllers/boardController');
 const listController = require('../controllers/listController');
 const cardController = require('../controllers/cardController');

//  UserController
 router.post('/users',userController.createUser);
 router.get('/users',userController.viewAllUsers);
 router.get('/users/:id',userController.viewUserById);

 // BoardController 
 router.get('/boards',boardController.viewBoard);
 router.post('/boards',boardController.allBoard);
 router.put('/board/:boardId', boardController.updateBoard);
 router.delete('/board/:boardId',boardController.deleteBoard);

 //  listController 
router.post('/lists',listController.createList);
router.get('/lists/',listController.viewList);
router.get('/lists/:boardId',listController.viewBoard);
router.put('/lists/:listId',listController.updateList);
router.delete('/lists/:listId', listController.deleteList);

// CardController
router.post('/card',cardController.createCard);
router.get('/cards/:listId', cardController.viewCard);
router.put('/cards/:cardsId',cardController.updateCard);
router.delete('/cards/:cardId',cardController.deleteCard);

// ActivityController
router.post('/activities', activityController.createActivity);
router.get('/activities/:boardId', activityController.viewActivity);

 module.exports = router;