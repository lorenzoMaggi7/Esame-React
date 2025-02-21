# Accademia - Sistema di Gestione Dati

Questo progetto è un'applicazione web composta da un backend in Python (Flask) e un frontend in React. Il sistema consente di visualizzare e caricare dati da un file JSON tramite un'interfaccia web. Gli utenti possono interagire con i dati relativi a persone, assenze e corsi.

## Struttura del progetto

- **Frontend (React)**: Una SPA che mostra i dati in formato tabellare, permette di selezionare tra diverse tabelle (`persona`, `assenza`, `wp`), e supporta il caricamento dinamico dei dati tramite una API.
- **Backend (Flask)**: Serve le API per caricare i dati dal file JSON, gestendo gli errori e la comunicazione tra il frontend e il database.

## Funzionalità

- **Visualizzazione dei dati**: L'utente può scegliere tra tre tabelle: `persona`, `assenza`, e `wp`.
- **Caricamento dei dati**: Il frontend interroga il backend per caricare i dati JSON dal file `database.json` e li visualizza in una tabella.
- **Interfaccia utente**: Un'interfaccia moderna con Tailwind CSS per un aspetto visivo attraente e reattivo.

## Prerequisiti

Assicurati di avere installato i seguenti strumenti:

- [Node.js](https://nodejs.org/) (versione >= 14)
- [Python](https://www.python.org/downloads/) (versione >= 3.6)
- [pip](https://pip.pypa.io/en/stable/) per installare pacchetti Python
- [Flask](https://flask.palletsprojects.com/en/2.0.x/) per il backend

## Installazione

### 1. Clonare il progetto

Clona il repository del progetto nel tuo ambiente locale:

```bash
git clone https://github.com/tuo-utente/accademia.git
cd accademia
