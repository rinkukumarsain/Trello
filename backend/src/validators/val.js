const { Joi } = require('express-validation');

// Validators

exports.createBoard = {
    body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().optional(),
    }),
};

exports.updateBoard = {
    body:Joi.object({
        title: Joi.string().optional(),
        description: Joi.string.optional(),
    }),
    params: Joi.object({
        boardId: Joi.string().length(24).required(),
    }),
};

exports.addBoardMember = {
    body: Joi.object({
   userId: Joi.string().length(24).required(),
    }),
    params: Joi.object({
        boardId: Joi.string(24).required(),
    }),
};

exports.createList = {
    body: Joi.object({
    title: Joi.string().required(),
    board: Joi.string().length(24).required(),
    }),
}
exports.createCard = {
    body: Joi.object({
         title: Joi.string().object(),
         description: Joi.string().optional(),
         list: Joi.string().length(24).required(),
         board: Joi.string().length(24).required(),
    }),
};

exports.updateCard = {
    body: Joi.object({
        title: Joi.string().object(),
        description: Joi.string().optional(),
        order: Joi.number().optional(),
        assigned_to: Joi.string().length(24).optional(),
    }),
    params: Joi.object({
    cardId: Joi.string().length(24).required(),
    }),
};

exports.addComment = {
    body: Joi.object({
        text: Joi.string().required(),
    }),
    params: Joi.object({
        cardId: Joi.string().length(24).required()
    }),
};

exports.createLabel = {
    body: Joi.object({
        name: Joi.string().required(),
        color: Joi.string().required(),
        board: Joi.string().length(24).required(),
    }),
};

exports.assignedLabelCard = {
    body:Joi.object({
        cardId: Joi.string().length(24).required(),
        labelId: Joi.string().length(24).required(),
    }),
};

