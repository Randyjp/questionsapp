const questionService = require('../services/Question');

exports.getQuestions = async (req, res, next) => {
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try {
        var questions = await questionService.getQuestions({}, page, limit);
        return res.status(200).json({status: 200, data: questions});
    } catch(e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

exports.createQuestion = async (req, res, next) => {
    var questionObj = {
        title: req.body.title,
        description: req.body.description
    }

    try {
        var createdQuestion = await questionService.createQuestion(questionObj);
        return res.status(201).json({status: 201, data: createdQuestion});
    } catch(e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

exports.updateQuestion = async (req, res, next) => {
    if(!req.body._id) return res.status(400).json({status: 400, message: "Id must be present"});

    var id = req.body._id;

    var questionObj = {
        id: id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        active: req.body.active ? req.body.active : null,
        deleted: req.body.deleted ? req.body.deleted : null,
    };

    try {
        var updatedQuestion = await questionService.updateQuestion(questionObj);
        return res.status(200).json({status: 200, data: updatedQuestion});
    } catch(e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.removeQuestion = async (req, res, next) => {
    var id = req.params.id;

    try {
        var removedQuestion = await questionService.updateQuestion({
            id,
            active: false,
            deleted: true
        });
        return res.status(200).json({status: 200, data: removedQuestion});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}