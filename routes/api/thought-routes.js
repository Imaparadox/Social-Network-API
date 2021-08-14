const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought
} = require('../../controllers/thought-controller');

router.route('/')
    .get(getAllThoughts)
    .post(addThought)

router.route('/:id')
    .get(getThoughtById)
    .put()
    .delete();

router.route('/:thoughtId/reactions/')
    .post()
    .delete()

module.exports = router;