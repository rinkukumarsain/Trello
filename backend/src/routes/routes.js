// routes 
 
const express =require('express');
 const router = express.Router();
 const userController = require('../controllers/userController');
 const activityController = require('../controllers/activityController');
 const boardController = require('../controllers/boardController');
 const listController = require('../controllers/listController');
 const cardController = require('../controllers/cardController');
const adminController = require('../controllers/adminController');
// admin routers 
router.post('/adminlogin', adminController.login);
router.post('/changePassword',adminController.changePasswordController);
router.get('/adminAuthCheck',adminController.checkAuth);
router.post('/updateAdminCity',adminController.updateAdminCityController);


//  User router
 router.post('/users',userController.createUser);
 router.get('/users',userController.viewAllUsers);
 router.get('/users/:id',userController.viewUserById);

 // Board router

 router.get('/boards',boardController.viewBoard);
 router.post('/boards',boardController.allBoard);
 router.put('/board/:boardId', boardController.updateBoard);
 router.delete('/board/:boardId',boardController.deleteBoard);

 //  list router

router.post('/lists',listController.createList);
router.get('/lists/',listController.viewList);
router.get('/lists/:boardId',listController.viewBoard);
router.put('/lists/:listId',listController.updateList);
router.delete('/lists/:listId', listController.deleteList);

// Card router

router.post('/card',cardController.createCard);
router.get('/cards/:listId', cardController.viewCard);
router.put('/cards/:cardsId',cardController.updateCard);
router.delete('/cards/:cardId',cardController.deleteCard);

// Activity router

router.post('/activities', activityController.createActivity);
router.get('/activities/:boardId', activityController.viewActivity);

 module.exports = router;