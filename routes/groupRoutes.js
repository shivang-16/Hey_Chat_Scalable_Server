import express from 'express'
import { getAllGroups, saveGroup } from '../controllers/groupController.js'
import isAuthenticated from '../middleware/auth.js'

const router = express.Router()

router.post('/add', isAuthenticated, saveGroup)
router.post('/get', getAllGroups)


export default router