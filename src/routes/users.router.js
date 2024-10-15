import { Router } from 'express'
import { loginUser, registerUser, getCurrentUser } from '../controllers/users.controller.js'
import { authToken } from '../../utils.js'


const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/current', authToken, getCurrentUser)
router.get('*', (req, res) => {
    res.status(404).send('Cannot get the specified word')
})

export default router