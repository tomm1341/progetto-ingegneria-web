import { Request, Response } from "express"
import { connection } from "../utils/db"


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