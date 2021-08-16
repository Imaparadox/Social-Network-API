const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    addNewFriend,
    removeFriend,
    deleteUser
} = require('../../controllers/user-controller');

// /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)


router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

router.route('/:id/friends')
    .post(addNewFriend)

router.route('/:id/friends/:friendId')
    .delete(removeFriend)


module.exports = router;