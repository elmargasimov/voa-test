var QuestionnaireModel = require('../models/questionnaire.server.model.js');

exports.create = createForm;

//////////////////

function createForm(req, res) {
    var questionnaire = new QuestionnaireModel(req.body);
    questionnaire.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log(questionnaire);
            res.render('thank-you', questionnaire);
        }
    });
}