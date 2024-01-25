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

/*****************************************  LOGIN  ***************************************************************/
export const login = async (req: Request, res: Response) => {
  // Blocca la richiesta se l'utente ha già effettuato il login
  const user = decodeAccessToken(req, res)
  if (user) {
    res.status(403).send("Questa operazione richiede il logout.")
    return
  }

  const { username, password } = req.body

  // Esegue la query al database per ottenere i dati dell'utente in base allo username
  const connection = await getConnection()
  const [results] = await connection.execute(
    "SELECT id_utente, username, password, ruolo FROM utenti WHERE username=?",
    [username]
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

/*****************************************  REGISTER  ***************************************************************/

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

export const getUserById = async (req: Request, res: Response) => {
  const connection = await getConnection()

  const [data] = await connection.execute(`SELECT nome, cognome, username, email, eta, genere, professione, ruolo FROM utenti WHERE id_utente=?`, [req.params.id])
  const user = (data as any)[0]
  res.json(user)
}

/******************************************** USERSLIST *************************************/

export const usersList = async (req: Request, res: Response) => {

  const connection = await getConnection();
  const [users] = await connection.execute("SELECT * FROM utenti ORDER BY ruolo desc")

   if (Array.isArray(users) && users.length <= 0) {
    res.status(500).send("Nessun utente registrato")
    return
  }

  res.json(users)
}

export const getUsernameById = async (req: Request, res: Response) => {
  const connection = await getConnection();

  const username = await connection.execute("SELECT username FROM utenti WHERE id_utente=?", [req.params.id])
  res.json(username)
}


export const deleteUser = async (req: Request, res: Response) => {
  const user = decodeAccessToken(req, res);

  //Ulteriore controllo dei permessi
  if(user?.ruolo != 'admin' && user?.id_utente != req.params.id as unknown as number){
    res.status(401).send("Non possiedi i permessi")
    return
  }
  const connection = await getConnection();

  await connection.execute("DELETE FROM utenti WHERE id_utente=?", [req.params.id])
  res.status(200).send("Richiesta andata a buon fine")


}

/***************************************** EDIT USER ***********************************************/

export const editUser = async (req: Request, res: Response) => {
  const conn = await getConnection()
  const {nome, cognome, username, email, eta, genere, professione} = req.body
  const user = decodeAccessToken(req, res);

  //Verifico che l'username sia disponibile
  const connection = await getConnection()
  const [users] = await connection.execute("SELECT username FROM utenti WHERE username=? AND id_utente<>?", [
    username, user?.id_utente
  ])
  if (Array.isArray(users) && users.length > 0) {
    res.status(400).send("Username già in uso.")
    return
  }

  if(user){

    await conn.execute(`
    UPDATE utenti SET nome=?, cognome=?, username=?, email=?, eta=?, genere=?, professione=? WHERE id_utente=?`,
    [nome, cognome, username, email, eta, genere, professione, user.id_utente])
    res.status(200).send("Richiesta andata a buon fine")

  } else { 
    res.status(403).send("Questa operazione richiede il logout.")
  }
}

