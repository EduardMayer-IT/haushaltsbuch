## Code-Dokumentation 

JavaScript-Code in den Dateien uebersicht.js, app.js und die zugehörigen HTML-Dateien uebersicht.html und index.html 

## uebersicht.js:

document.addEventListener('DOMContentLoaded', function() {...}: 
* Dieser Code führt die darin enthaltenen Funktionen aus, sobald das DOM (Document Object Model) vollständig geladen ist, was sicherstellt, dass der JavaScript-Code ausgeführt wird, sobald die HTML-Seite bereit ist.

var transactionsFromStorage = localStorage.getItem('transactions');: 
* Dieser Code versucht, Transaktionen aus dem Local Storage abzurufen. Falls keine gespeicherten Transaktionen vorhanden sind, wird transactionsFromStorage auf null gesetzt.

var transactions = transactionsFromStorage ? JSON.parse(transactionsFromStorage) : [];: 
* Hier werden die abgerufenen Transaktionen aus dem Local Storage analysiert. Wenn welche vorhanden sind, werden sie in das transactions-Array geladen. Andernfalls wird ein leeres Array erstellt.

function createLineChart() {...}:
* Diese Funktion erstellt ein Liniendiagramm mit Einnahmen und Ausgaben, basierend auf den Transaktionen im transactions-Array. Es filtert die Einnahmen und Ausgaben in separate Arrays, erstellt Labels und Daten für die Grafik und verwendet die Chart.js-Bibliothek zur Erstellung des Diagramms.

createLineChart();: 
* Diese Funktion wird aufgerufen, um das Diagramm bei Seitenaufruf zu erstellen und anzuzeigen.

## uebersicht.html:

Die HTML-Datei enthält die Struktur der Übersichtsseite. Sie verwendet auch die Chart.js-Bibliothek und die uebersicht.js-Datei, um das Liniendiagramm anzuzeigen.

## style.css:

Die CSS-Datei enthält das Styling für die Webseite, einschließlich Hintergrundfarben, Schriftarten und Layout.

## index.html:

Diese HTML-Datei ist die Hauptseite der Haushaltsbuch-Anwendung. Sie enthält ein Formular zum Hinzufügen von Transaktionen, eine Liste zum Anzeigen der Transaktionen und die Auswahl eines Monats für die Filterung. Es wird auch die app.js-Datei eingebunden, um die JavaScript-Funktionalität zu aktivieren.

## app.js:

document.addEventListener('DOMContentLoaded', function() {...}:  
* Dieser Code führt die darin enthaltenen Funktionen aus, wenn die Seite geladen ist.

Die transactionForm und andere HTML-Elemente werden aus dem DOM ausgewählt, um auf sie zugreifen zu können.

Ein leeres Array transactions wird erstellt, um Transaktionen zu speichern.

addTransaction(transaction):
* Funktion zum Hinzufügen einer Transaktion zum transactions-Array und Aktualisieren des Local Storage.

displayTransactions(transactions): 
* Funktion zur Anzeige der Transaktionen in der Liste auf der Hauptseite.

displayTransactionsForMonth(month): 
* Funktion zur Anzeige der Transaktionen für den ausgewählten Monat.

updateLocalStorage(): 
* Funktion zum Aktualisieren des Local Storage mit den aktuellen Transaktionen.

loadTransactionsFromLocalStorage(): 
* Funktion zum Laden der zuvor gespeicherten Transaktionen aus dem Local Storage beim Start der Anwendung.

transactionForm.addEventListener('submit', function(event) {...}:
*  Event-Listener für das Formular, um neue Transaktionen hinzuzufügen und die Liste zu aktualisieren.

monthSelect.addEventListener('change', function(event) {...}:
*  Event-Listener für die Auswahl des Monats, um die Liste basierend auf dem ausgewählten Monat zu filtern.

deleteBtnList.forEach(function(deleteBtn) {...}: 
* Event-Listener für die Schaltflächen zum Löschen von Transaktionen, die die ausgewählte Transaktion aus dem Array entfernen und die Anzeige aktualisiere