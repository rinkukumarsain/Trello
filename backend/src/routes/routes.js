const express = require('express');
const router = express.Router();

// Controllers

const activityController = require('../controllers/activityController');
const boardController = require('../controllers/boardController');
const listController = require('../controllers/listController');
const cardController = require('../controllers/cardController');
const labelController = require('../controllers/labelController');
const userController = require('../controllers/userController');
// const userDataController = require('../controllers/UserDataController');

// Middleware
const { auth, authorize }  = require('../middleware/auth');


// ========== User Routes ==========
// router.get('/user', auth, authorize('user', 'view'), userDataController.viewAllUser);
// router.get('/user/:id', auth, authorize('user', 'view'), userDataController.viewUserById);

// ========== login SignUp and Profile Route  ==========

router.post('/login', userController.login);
router.post('/signup',userController.signup);

// router.get('/profile', auth,userController.profile);

// ========== Board Routes ==========
router.get('/board/view', auth,authorize(['admin','member']), boardController.viewBoard);
router.post('/board', auth,authorize(['admin','member']),boardController.createBoard);
router.put('/board/:id', auth,authorize(['admin','member']),boardController.updateBoard);
router.delete('/board/:id', auth,authorize(['admin','member']), boardController.deleteBoard);

// ========== List Routes ==========
router.post('/list', auth, authorize(['admin','member']), listController.createList);
router.get('/list', auth, authorize(['admin','member']), listController.viewList);
router.get('/list/:boardId', auth, authorize(['admin','member']), listController.Board);
router.put('/list/:id', auth, authorize(['admin','member']), listController.updateList);
router.delete('/list/:id', auth, authorize(['admin','member']), listController.deleteList);

// ========== Card Routes ==========
router.post('/card', auth, authorize(['admin','member']), cardController.createCard);
router.get('/card/:listId', auth, authorize(['admin','member']), cardController.viewCard);
router.put('/card/:id', auth, authorize(['admin','member']), cardController.updateCard);
router.delete('/card/:id', auth, authorize(['admin','member']), cardController.deleteCard);

// ========== Activity Routes ==========
router.post('/activity', auth, authorize(['admin','member']), activityController.createActivity);
router.get('/activity/:boardId', auth, authorize(['admin','member']), activityController.viewActivity);

// ========== Label Routes ==========
router.post('/label', auth, authorize(['admin','member']), labelController.createLabel);
router.get('/label/:boardId', auth, authorize(['admin','member']), labelController.getLabelByBoard);
router.put('/label/:id', auth, authorize(['admin','member']), labelController.updateLabel);
router.delete('/label/:id', auth, authorize(['admin','member']), labelController.deleteLabel);

module.exports = router;
