import { Request } from 'express'
import {db} from '../connect'

export const register = (req: Request, res) => {
  const q = 'SELECT FROM users WHERE username = ?'

  db.query(q, [req.body.username])
}

export const login = (req, res) => { }

export const logout = (req, res) => { }