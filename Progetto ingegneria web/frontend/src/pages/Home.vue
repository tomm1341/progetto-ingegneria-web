<!--<script lang="ts">
import { defineComponent } from "vue"


</script>-->




<template>
<div class="row mx-auto mt-3 home"> <!--colonna offset-->
    <div class="col-2"></div>
    <div class="col-10 col-md-8">
      <img src=".../img/angular1.svg" alt="AngularJS Logo" class="d-inline img-fluid opacity-80" id="AngularImg">
    </div>
    <div class="col-8 col-lg-2 p-0" id="navbar-laterale-md-margin">
      <nav class="mx-4 navbar navbar-expand-lg navbar-dark">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#CollapseMenu"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <!--<script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
        <lord-icon
            id="lente"
            src="https://cdn.lordicon.com/msoeawqm.json"
            trigger="hover"
            colors="primary:#dc3545,secondary:#23b9e8">
        </lord-icon>-->
        </button>
        <div class="collapse navbar-collapse col-12" id="CollapseMenu">
          <ul class="nav flex-column navbar-nav nav-pills">
            <li class="nav-item">
              <a class="nav-link ps-2" href="#par1">Cos'è Angular?</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ps-2" href="#par2">Perché scegliere Angular</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ps-2" href="#par3">References</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>

  </div>
  <div class="row" id="par1">
    <div class="mt-5">
      <div class="rounded py-3 mx-3" id="shadow">
        <h1 class="display-4 text-center text-white fs-1">Angular: Un potente framework web</h1>
        <p class="text-white text-center fs-6 px-2">
          Angular è una piattaforma di sviluppo costruita su TypeScript. Essa comprende un framework basato su
          componenti per la creazione di applicazioni web scalabili, una raccolta di librerie ben integrate che coprono
          un'ampia gamma di funzionalità, tra cui routing, gestione dei moduli, comunicazione client-server e altro
          ancora, e una suite di strumenti per sviluppatori che aiutano a sviluppare, costruire, testare e aggiornare
          il codice. Con Angular, è possibile creare applicazioni di livello aziendale che possono scalare da progetti
          di un singolo sviluppatore a applicazioni su larga scala. Angular è stato progettato per rendere gli
          aggiornamenti il più semplici possibile, consentendo di sfruttare gli ultimi sviluppi con il minimo sforzo.
          Inoltre, l'ecosistema di Angular è composto da un gruppo eterogeneo di oltre 1,7 milioni di sviluppatori,
          autori di librerie e creatori di contenuti.</p>
      </div>
    </div>
  </div>

  <div class="row col-12" id="par2">
    <div class="mt-5 ms-2 ps-2 p-0">
      <div class="rounded mx-3" id="shadow">
        <h2 class="text-center text-white pt-2">Perché scegliere Angular?</h2>
        <p class="text-white text-center fs-6 pt-4">Ci sono diversi motivi per scegliere Angular rispetto ad altri framework o librerie per lo sviluppo di applicazioni web. Ecco alcuni punti chiave che distinguono Angular dai suoi possibili concorrenti:</p>
        <ul id="paragrafi">
          <li class="mx-5 text-white"><img src="../img/system-outline-31-check.gif" alt="Segno di spunta" class="icon-link-hover-img">Potenza e completezza: Angular è una piattaforma completa che offre un ampio set di funzionalità per lo sviluppo di applicazioni web complesse. Fornisce strumenti integrati per la gestione dei modelli, il routing, la gestione degli stati, l'injection delle dipendenze e molto altro ancora. Questo significa che non è necessario affidarsi a librerie o framework esterni per molte delle funzionalità essenziali, riducendo la dipendenza da terze parti e semplificando lo sviluppo complessivo dell'applicazione.</li>

          <li class="mx-5 mt-2 text-white"><img src="../img/system-outline-31-check.gif" alt="Segno di spunta" class="icon-link-hover-img">Architettura basata su componenti: Angular adotta un approccio basato su componenti, che favorisce la modularità e la riusabilità del codice. I componenti sono costruiti come blocchi autonomi e indipendenti, consentendo agli sviluppatori di sviluppare, testare e mantenere il codice in modo più efficiente. Inoltre, l'architettura dei componenti di Angular favorisce la separazione delle responsabilità e la collaborazione tra i membri del team di sviluppo.</li>

          <li class="mx-5 mt-2 text-white"><img src="../img/system-outline-31-check.gif" alt="Segno di spunta" class="icon-link-hover-img">TypeScript: Angular è scritto in TypeScript, un linguaggio di programmazione che aggiunge funzionalità di tipizzazione statica a JavaScript. TypeScript offre numerosi vantaggi, come il rilevamento degli errori a tempo di compilazione, un'IDE più potente con autocompletamento e refactoring, e una migliore organizzazione e struttura del codice. L'utilizzo di TypeScript con Angular permette agli sviluppatori di creare applicazioni più robuste e manutenibili.</li>

          <li class="mx-5 mt-2 text-white"><img src="../img/system-outline-31-check.gif" alt="Segno di spunta" class="icon-link-hover-img">Supporto e documentazione: Angular è supportato da Google, uno dei giganti dell'industria tecnologica. Questo si traduce in un'ampia comunità di sviluppatori attivi e una documentazione completa e di alta qualità. La documentazione di Angular fornisce esempi, tutorial e guide dettagliate che facilitano l'apprendimento del framework e risolvono i problemi comuni. Inoltre, la vasta comunità di sviluppatori offre supporto e risorse aggiuntive per aiutare gli sviluppatori ad affrontare sfide specifiche e rimanere aggiornati sulle ultime novità di Angular.</li>

          <li class="mx-5 mt-2 text-white pb-3" id="last-row"><img src="../img/system-outline-31-check.gif" alt="Segno di spunta" class="icon-link-hover-img">Prestazioni ottimizzate: Angular è stato progettato per offrire prestazioni ottimali anche con applicazioni complesse e volumi di dati elevati. Utilizza tecniche avanzate di rilevamento dei cambiamenti, rendering on-demand e caching dei moduli per garantire tempi di risposta rapidi e un'esperienza utente fluida. Inoltre, Angular offre strumenti per l'ottimizzazione delle prestazioni, come la generazione di bundle e il lazy loading dei moduli, che consentono di ridurre al minimo il tempo di caricamento e massimizzare l'efficienza dell'applicazione.</li>
        </ul>
      </div>
    </div>
  </div>


<div class="container-fluid pe-0 ps-4 py-4" id="app">
  <div class="row col-12 text-center" id="par3">
    <div class="col-1 p-0"></div>
      <div class="col-10 p-0">
        <div class="table-responsive text-white py-2">
          <table class="table text-white table-borderless align-middle m-0">
            <tbody>
              <tr>
                <td id="link"><a href="#" class="text-white">Benvenuti in Angular</a></td>
                <td>
                 <!-- <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                    <lord-icon src="https://cdn.lordicon.com/zmkotitn.json"
                      trigger="hover"
                      colors="primary:#ffffff">
                    </lord-icon>-->
                </td>
                <td>Uno sguardo ad uno dei framework web più utilizzati</td>
              </tr>
              <tr>
                <td id="link"><a href="#" class="text-white">Tutorial Angular</a></td>
                  <td class="align-middle">
                   <!-- <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                      <lord-icon src="https://cdn.lordicon.com/zmkotitn.json"
                        trigger="hover"
                        colors="primary:#ffffff">
                      </lord-icon>-->
                  </td>
                  <td class="justify-content-right">Una guida passo-passo che ti permetterà di creare un sito e-commerce utilizzando Angular. Prova tu stesso testando il codice direttamente sul sito!</td>
              </tr>
              <tr>
                <td id="link"><a href="#" class="text-white">Accessibilità</a></td>
                <td>
                 <!-- <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                    <lord-icon src="https://cdn.lordicon.com/zmkotitn.json"
                      trigger="hover"
                      colors="primary:#ffffff">
                    </lord-icon>-->
                </td>
                <td>Ecco spiegate alcune tecniche per progettare applicazioni Angular che possano essere utilizzate anche da chi ha difficoltà visive / motorie / uditive</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    <!--<div class="col-4"></div>-->
    <div class="col-1 p-0"></div>
  </div>
</div>
</template>