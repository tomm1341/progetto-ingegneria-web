import { Request, Response } from "express"
import { getConnection } from "../utils/db" 
import { Utente } from "../types"
import express from 'express';
import bodyParser from "body-parser";
import bcrypt from "bcrypt"
import { decodeAccessToken, deleteAccessToken, setAccessToken } from "../utils/auth"
import { connect } from "http2";



const app = express();

app.use(bodyParser.json());
/*
export async function inviaDatiController(req: Request, res: Response): Promise<void> {
  try {
    const { nome, cognome, username, email, password, eta, genere, professione, ruolo }:Utente = req.body;

    // Esecuzione query per inserire i dati nel database
    const query = `
      INSERT INTO utenti (nome, cognome, username, email, password, eta, genere, professione, ruolo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [nome, cognome, username, email, password, eta, genere, professione, ruolo];
    console.log(req.body)

    connection.execute(query, values, (error, results) => {
      if (error) {
        console.error('Errore durante l\'inserimento dell\'utente nel database:', error);
        res.status(500).json({ error: 'Errore durante la registrazione dell\'utente' });
        console.log(req.body)
      } else {
        console.log('Utente registrato con successo');
        res.status(200).json({ message: 'Utente registrato con successo' });
      }
    });
  } catch (error) {
    console.error('Errore durante la registrazione dell\'utente:', error);
    res.status(500).json({ error: 'Errore durante la registrazione dell\'utente' });
  }
}*/

/*****************************************  LOGIN  ***************************************************************/
export const login = async (req: Request, res: Response) => {
  // Blocca la richiesta se l'utente ha già effettuato il login
  const user = decodeAccessToken(req, res)
  if (user) {
    res.status(403).send("Questa operazione richiede il logout.")
    return
  }

  const { email, password } = req.body

  // Esegue la query al database per ottenere i dati dell'utente in base allo username
  const connection = await getConnection()
  const [results] = await connection.execute(
    "SELECT id_utente, email, password, ruolo FROM utenti WHERE email=?",
    [email]
  )

  // Errore se l'utente non è stato trovato
  if (!Array.isArray(results) || results.length == 0) {
    res.status(400).send("Credenziali errate.")
    return
  }

  const userData = results[0] as any

  // Confronta l'hash della password fornita con quello nel database
  const passwordOk = await bcrypt.compare(password, userData.password)

  // Errore se la password è errata
  if (!passwordOk) {
    res.status(400).send("Credenziali errate.")
    return
  }

  // Importante! Rimuove la password dall'oggetto utente
  delete userData.password

  // Crea un JWT contenente i dati dell'utente e lo imposta come cookie
  setAccessToken(req, res, userData)

  res.json({ message: "Login effettuato con successo" })
}

/*****************************************  AUTH  ***************************************************************/

export const register = async (req: Request, res: Response) => {
  // Blocca la richiesta se l'utente ha già effettuato il login
  /*const user = decodeAccessToken(req, res)
  if (user) {
    res.status(403).send("Questa operazione richiede il logout.")
    return
  }*/
  const { nome, cognome, username, email, password, eta, genere, professione, ruolo } = req.body

  //Verifico che l'username sia disponibile
  const connection = await getConnection()
  const [users] = await connection.execute("SELECT username FROM utenti WHERE username=?", [
    username,
  ])
  if (Array.isArray(users) && users.length > 0) {
    res.status(400).send("Username già in uso.")
    return
  }
    // Creo l'hash della password per non salvarla in chiaro
  const passwordHash = await bcrypt.hash(password, 10)  
    // Inserisce l'utente nel database
  await connection.execute("INSERT INTO utenti (nome, cognome, username, email, password, eta, genere, professione, ruolo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [
    nome,
    cognome,
    username,
    email,
    passwordHash,
    eta,
    genere,
    professione,
    ruolo
  ])

  // Estrae i dati per il nuovo utente
  const [results] = await connection.execute(
    "SELECT id_utente, username, ruolo FROM utenti WHERE username=?",
    [username]
  )
  const newUser = (results as any)[0]

  // Crea un JWT contenente i dati dell'utente e lo imposta come cookie
  setAccessToken(req, res, newUser)

  res.json({ message: "Registrazione effettuata con successo" })
}

/***************************************** LOGOUT ***********************************************/


export const logout = async (req: Request, res: Response) => {
  // Blocca la richiesta se l'utente non ha effettuato il login
  const user = decodeAccessToken(req, res)
  if (!user) {
    res.status(403).send("Questa operazione richiede l'autenticazione.")
    return
  }
  // Cancella il cookie contenente l'access token
  deleteAccessToken(req, res)
  res.json({ message: "Logout effettuato con successo" })
}

export const getProfile = async (req: Request, res: Response) => {
  // Decodifica il contenuto dell'access token, che contiene il dati dell'utente, e lo invia in risposta
  const user = decodeAccessToken(req, res)
  res.json(user)
}