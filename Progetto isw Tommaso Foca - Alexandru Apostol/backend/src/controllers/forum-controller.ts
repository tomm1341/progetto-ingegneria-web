import { Request, Response } from "express"
import { connection } from "../utils/olddb"


export async function allQA(req: Request, res: Response) {
  connection.execute(
    `SELECT utenti.username AS utente, domande_utenti.testo_domanda, risposte.testo_risposta
    FROM domande_utenti
    LEFT JOIN risposte ON domande_utenti.id_domanda = risposte.id_domanda
    JOIN utenti ON domande_utenti.id_utente = utenti.id_utente;`,
    [],
    function (err, results, fields) {
      res.json(results)
    }
  )
}

export async function getQuestions(req: Request, res: Response) {
  connection.execute(
    `SELECT * FROM domande_utenti`,
    [],
    function (err, results, fields) {
      res.json(results)
    }
  )
}

// CODICE CON AWAIT

/*
import { Request, Response } from "express"
import { connection } from "../utils/olddb"
import { QueryError, RowDataPacket, OkPacket } from 'mysql2/promise'


export const allQA = async (req: Request, res: Response) => {
  try {
    const connection = await getConnection()
    const [results] = await connection.execute<RowDataPacket[]>(
      `SELECT utenti.username AS utente, domande_utenti.testo_domanda, risposte.testo_risposta
      FROM domande_utenti
      LEFT JOIN risposte ON domande_utenti.id_domanda = risposte.id_domanda
      JOIN utenti ON domande_utenti.id_utente = utenti.id_utente;`
    )
    res.json(results)
  } catch (error) {
    // Gestione errori
    console.error('Errore durante l\'esecuzione della query:', error)
    res.status(500).json({ error: 'Errore durante il recupero dei dati.' })
  }
}

export const getQuestions = async(req: Request, res: Response) => {
  
  try{
    const connection = await getConnection()
    const [results] = await connection.execute<RowDataPacket[]>(
    `SELECT * FROM domande_utenti`
    )
    res.json(results)
  } catch (error) {
    console.error('Errore durante l\'esecuzione della query:', error)
    res.status(500).json({ error: 'Errore durante il recupero dei dati.' })
  }
   
}
*/