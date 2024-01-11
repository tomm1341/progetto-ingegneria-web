export interface Utente {
  id_utente:number
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
  data: string
}

export interface Risposta {
  id_risposta: number
  id_utente: number
  id_domanda: number
  testo_risposta: string
  data: string
}