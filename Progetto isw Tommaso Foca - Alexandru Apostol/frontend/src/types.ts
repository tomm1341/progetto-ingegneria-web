export interface Utente {
  nome: string
  cognome: string
  username: string
  password: string
  email: string
  eta: number
  genere: string
  professione: string
  ruolo: "admin" | "user"
}

export interface Domanda {
  id_domanda: number
  id_utente: number
  testo_domanda: string
}

