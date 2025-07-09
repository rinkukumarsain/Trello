const express = require('express');
const router = express.Router();

// Controllers

const activityController = require('../controllers/activityController');
const boardController = require('../controllers/boardController');
const listController = require('../controllers/listController');
const cardController = require('../controllers/cardController');
const labelController = require('../controllers/labelController');
const userController = require('../controllers/userController');
const userDataController = require('../controllers/UserDataController');


// Middleware
const { auth, authorize }  = require('../middleware/auth');


// ========== login SignUp and Profile Route  ==========
router.post('/login', userController.login);
router.post('/signup',userController.signup);
// router.get('/profile', auth,userController.profile);


// ========== User Routes ==========
router.get('/user', auth, authorize('user', 'view'), userDataController.viewAllUser);
router.get('/user/:id', auth, authorize('user', 'view'), userDataController.viewUserById);

// ========== Board Routes ==========
router.get('/board', auth, authorize('board', 'view'), boardController.viewBoard);
router.post('/board', auth, authorize('board', 'create'), boardController.createBoard);
router.put('/board/:id', auth, authorize('board', 'update'), boardController.updateBoard);
router.delete('/board/:id', auth, authorize('board', 'delete'), boardController.deleteBoard);

// ========== List Routes ==========
router.post('/list', auth, authorize('list', 'create'), listController.createList);
router.get('/list', auth, authorize('list', 'view'), listController.viewList);
router.get('/list/:boardId', auth, authorize('list', 'view'), listController.Board);
router.put('/list/:id', auth, authorize('list', 'update'), listController.updateList);
router.delete('/list/:id', auth, authorize('list', 'delete'), listController.deleteList);

// ========== Card Routes ==========
router.post('/card', auth, authorize('card', 'create'), cardController.createCard);
router.get('/card/:listId', auth, authorize('card', 'view'), cardController.viewCard);
router.put('/card/:id', auth, authorize('card', 'update'), cardController.updateCard);
router.delete('/card/:id', auth, authorize('card', 'delete'), cardController.deleteCard);

// ========== Activity Routes ==========
router.post('/activity', auth, authorize('activity', 'create'), activityController.createActivity);
router.get('/activity/:boardId', auth, authorize('activity', 'view'), activityController.viewActivity);

// ========== Label Routes ==========
router.post('/label', auth, authorize('label', 'create'), labelController.createLabel);
router.get('/label/:boardId', auth, authorize('label', 'view'), labelController.getLabelByBoard);
router.put('/label/:id', auth, authorize('label', 'update'), labelController.updateLabel);
router.delete('/label/:id', auth, authorize('label', 'delete'), labelController.deleteLabel);

module.exports = router;
