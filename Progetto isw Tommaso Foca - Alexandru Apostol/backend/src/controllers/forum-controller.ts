import { Request, Response } from "express"
import { connection } from "../utils/olddb"
import { Domanda } from "../types"
import { decodeAccessToken } from "../utils/auth"
import { getConnection } from "../utils/db"
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

/*export const getAnswers = async (req:Request, res:Response) => {
  const connection = await getConnection();

  const risposte = await connection.execute(`
  SELECT r.id_risposta, r.id_domanda, r.id_utente, r.testo_risposta, r.data, u.username
  FROM risposte r JOIN utenti u ON (r.id_utente = u.id_utente)
  WHERE r.id_domanda = (?)
  ORDER BY id_risposta DESC`, [req.params.id])

  res.json(risposte)
}*/

export async function getAnswers(req: Request, res: Response) {
  connection.execute(
      `SELECT r.id_risposta, r.id_domanda, r.id_utente, r.testo_risposta, r.data, u.username
      FROM risposte r JOIN utenti u ON (r.id_utente = u.id_utente)
      WHERE r.id_domanda = (?)
      ORDER BY id_risposta ASC`,
    [req.params.id],
    function (err, results, fields) {
      res.json(results)
    }
  )
}

export async function getQuestions(req: Request, res: Response) {
  connection.execute(
    `SELECT d.id_domanda, d.id_utente, d.testo_domanda, d.data, u.username 
    FROM domande_utenti d JOIN utenti u ON (d.id_utente = u.id_utente)
    ORDER BY id_domanda DESC`,
    [],
    function (err, results, fields) {
      res.json(results)
    }
  )
}

export const deleteComment = async (req:Request, res:Response) => {
  const connection = await getConnection();

  await connection.execute(`DELETE FROM risposte WHERE id_risposta = ?`, [req.params.id])
  
  res.json({ success: true })
} 

export const MakeQuestion = async (req:Request, res:Response) => {

  //Verifico che l'utente sia loggato
  const user = decodeAccessToken(req, res)
  const data = new Date().toISOString().split('T')[0] // Inizializza con la data corrente
  if (!user) {
    res.status(403).send("Questa operazione richiede l'autenticazione.")
    return
  }
  if (!req.body) {
    res.status(400).send("La richiesta non contiene un corpo (req.body). Assicurati di inviare i dati correttamente.");
    return;
  }
  if (req.body.testo_domanda === undefined) {
    res.status(400).send("Il campo testo_domanda è richiesto.");
    return;
  }


  const connection = await getConnection();

  await connection.execute("INSERT INTO domande_utenti (id_utente, testo_domanda, data) VALUES (?, ?, ?)", [
    user.id_utente,
    req.body.testo_domanda as string,
    data
  ])
  res.json({success: true})
}


export async function deletePost(req: Request, res: Response) {
    // Verifica che l'utente abbia effettuato il login
  const user = decodeAccessToken(req, res)
  if (!user) {
    res.status(403).send("Questa operazione richiede l'autenticazione.")
    return
  }
  const conn = await getConnection()
  // Verifica che il post esista
  const [posts] = await conn.execute("SELECT * FROM domande_utenti WHERE id_domanda=?", [req.params.id])
  if (!Array.isArray(posts) || posts.length == 0) {
    res.status(404).send("Post non trovato.")
    return
  }
  // Verifica che l'utente abbia i permessi per eliminare il post
  const post = posts[0] as any
  if (post.id_utente != user.id_utente && user.ruolo != "admin") {
    res.status(403).send("Non hai i permessi per eliminare questo post.")
    return
  }
  
  await conn.execute("DELETE FROM domande_utenti WHERE id_domanda=?", [req.params.id])
  res.json({ success: true })
}

export async function newComment(req: Request, res: Response) {
  const conn = await getConnection()

  const user = decodeAccessToken(req, res)
  const data = new Date().toISOString().split('T')[0] // Inizializza con la data corrente

    if (!user) {
    res.status(403).send("Questa operazione richiede l'autenticazione.")
    return
  }
  if (!req.body) {
    res.status(400).send("La richiesta non contiene un corpo");
    return;
  }
  if (req.body.testo_risposta === undefined) {
    res.status(400).send("Il campo testo_risposta è richiesto.");
    return;
  }

  await conn.execute(`
  INSERT INTO risposte (id_utente, id_domanda, testo_risposta, data) VALUES (?, ?, ?, ?)`, 
  [ 
    user?.id_utente,
    req.body.id_domanda,
    req.body.testo_risposta,
    data
  ])

  res.json({ success:true })

}

export async function editComment(req: Request, res: Response) {
  try {
    const conn = await getConnection();

    const { testo_risposta, data, id } = req.body;
    //const { id } = req.params;

    if (!testo_risposta || !id) {
      return res.status(400).send("Dati mancanti o non validi per l'aggiornamento");
    }

    await conn.execute(`UPDATE risposte SET testo_risposta=?, data=? WHERE id_risposta=?`, [testo_risposta, data, id]);
    res.status(200).send("Modifica effettuata con successo");
  } catch (error) {
    console.error("Errore nell'aggiornamento del commento:", error);
    res.status(500).send("Errore nell'aggiornamento del commento");
  }
}

/************************* POPULAR API ***************************/

export async function mostCommentedPosts(req: Request, res: Response) {
connection.execute(`SELECT
    du.id_domanda, du.id_utente, du.testo_domanda, du.data, u.username, COUNT(r.id_risposta) AS numero_risposte
    FROM domande_utenti du
    JOIN risposte r ON (du.id_domanda = r.id_domanda)
    JOIN utenti u ON (du.id_utente = u.id_utente)
    GROUP BY du.id_domanda, du.testo_domanda
    ORDER BY numero_risposte DESC, data ASC
    LIMIT 3`,  [],
    function (err, results, fields) {
      res.json(results)
    })
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