const express = require('express');
const router = express.Router();
// list of all courses endpoint
router.get('/', (req, res) => {
    res.send(courses);
})

//list specific course
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with that id was not found!')
    } else {
        res.send(course);
    }
})

//adding request
router.post('/', (req, res) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);
    if (result.error) {
        var error = result.error.details[0].message;
        res.status(400).send(error);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(courses);
});


router.put('/:id', (req, res) => {
    //look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        //if not exisiting, return 404
        return res.status(404).send('The course with that id was not found!')
    }

    //validate
    const { error } = validateCourse(req.body); //result.error

    if (error) {
        var err = error.details[0].message;
        res.status(400).send(err);
        return;
    }

    //update course
    course.name = req.body.name;
    res.send(course);

    //return updated course
});


router.delete('/:id', (req, res) => {
    //look up course
    //look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        //if not exisiting, return 404
        res.status(404).send('The course with that id was not found!')
    }
    //delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
    //return course
})

function validateCourse(course) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(course)
    return result;
}

module.exports = router;