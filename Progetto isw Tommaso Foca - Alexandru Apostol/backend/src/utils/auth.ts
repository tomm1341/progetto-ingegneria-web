import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { Utente } from "../../src/types"

//Carico le variabili d'ambiente da variables.env
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const COOKIE_NAME = "acces_token"


export const setAccessToken = (req: Request, res: Response, user: any) => {
  // Crea l'access token con JWT
  const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: "1 day" })
  // Imposta l'access token come cookie
  res.cookie(COOKIE_NAME, accessToken, {
    maxAge: 86400000, // 1 giorno in millisecondi
    httpOnly: true,
    sameSite: true,
    // secure: true
  })
}

export const decodeAccessToken = (req: Request, res: Response) => {
  // Ottiene il cookie dell'access token
  const accessToken = req.cookies[COOKIE_NAME]
  // Restituisce i dati dell'utente contenuti nell'access token, oppure null se il token è mancante o invalido
  if (!accessToken) return null
  try {
    const user = jwt.verify(accessToken, JWT_SECRET) as Utente
    return user
  } catch {
    return null
  }
}

export const deleteAccessToken = (req: Request, res: Response) => {
  // Cancella il cookie dell'access token
  res.clearCookie(COOKIE_NAME)
}
