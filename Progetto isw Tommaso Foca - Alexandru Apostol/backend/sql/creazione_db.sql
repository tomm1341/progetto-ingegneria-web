
CREATE DATABASE IF NOT EXISTS AngularForum;

use AngularForum;

-- Creazione della tabella utenti
CREATE TABLE utenti (
    id_utente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    cognome VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    eta INT,
    genere VARCHAR(10)
);

-- Creazione della tabella moderatori
CREATE TABLE moderatori (
    id_moderatore INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    cognome VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    eta INT,
    genere VARCHAR(10),
    professione VARCHAR(255)
);

-- Creazione della tabella domande_utenti
CREATE TABLE domande_utenti (
    id_domanda INT PRIMARY KEY AUTO_INCREMENT,
    id_utente INT,
    testo_domanda TEXT,
    FOREIGN KEY (id_utente) REFERENCES utenti(id_utente) ON DELETE CASCADE
);

-- Creazione della tabella risposte
CREATE TABLE risposte (
    id_risposta INT PRIMARY KEY AUTO_INCREMENT,
    id_utente INT,
    id_domanda INT,
    testo_risposta TEXT,
    FOREIGN KEY (id_utente) REFERENCES utenti(id_utente) ON DELETE CASCADE,
    FOREIGN KEY (id_domanda) REFERENCES domande_utenti(id_domanda) ON DELETE CASCADE
);
