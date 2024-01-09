const router = require('express').Router();
const {
  createThought,
  getThought,
  getSingleThought,
  deleteThought,
  editThought,
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThought).post(createThought);

router.route('/:thoughtId').get(getSingleThought);

router.route('/:thoughtId').delete(deleteThought);

router.route('/:thoughtId').put(editThought);

module.exports = router;
