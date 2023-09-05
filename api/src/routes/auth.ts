import express from 'express'
import {login, register, logout} from '../controllers/authController'

const router = express.Router()

router.post('login', login )
router.post('login', register )
router.post('login', logout )

export default router