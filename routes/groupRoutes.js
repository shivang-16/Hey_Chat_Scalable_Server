import express from 'express'
import { getAllGroups, getMyGroups, joinGroup, saveGroup } from '../controllers/groupController.js'
import isAuthenticated from '../middleware/auth.js'

const router = express.Router()

router.post('/add', isAuthenticated, saveGroup)
router.get('/get', getAllGroups)
router.get('/mygroups', isAuthenticated, getMyGroups)
router.patch('/join', isAuthenticated, joinGroup)


export default router