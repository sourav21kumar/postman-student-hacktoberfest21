const express = require('express')
const route_controller = require('../controller/route_controller')
const router = express.Router();


router.get('/contestants',route_controller.api_get_show_contestants)

router.get('/contestants/:id',route_controller.api_get_getAContestat)
router.post('/contestants',route_controller.api_post_add_contestants)

router.patch('/contestants/:id',route_controller.patch_updateContestant)
router.patch('/contestants/:id/upvote',route_controller.api_contestantUpvote)

router.delete('/contestants/:id',route_controller.api_deleteContestant)
module.exports = router;