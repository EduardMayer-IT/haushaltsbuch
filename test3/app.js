document.addEventListener('DOMContentLoaded', function() {
    var transactionForm = document.getElementById('transactionForm');
    var monthSelect = document.getElementById('monthSelect');
    var transactionList = document.getElementById('transactionList');
    var categoryInput = document.querySelector('#category.input-field');
    var amountInput = document.querySelector('#amount.input-field');
    var dateInput = document.querySelector('#date.input-field');
    var cycleSelect = document.querySelector('#cycle.input-field');
  
    // Array zum Speichern der Transaktionen
    var transactions = [];
  
    // Funktion zum Hinzufügen einer Transaktion zum Array
    function addTransaction(transaction) {
      transactions.push(transaction);
    }
  
    // Funktion zum Anzeigen der Transaktionen in der Liste
    function displayTransactions(transactions) {
      transactionList.innerHTML = '';
      for (var i = 0; i < transactions.length; i++) {
        var transaction = transactions[i];
        var transactionElement = document.createElement('li');
        transactionElement.classList.add('transaction');
        transactionElement.innerHTML = `
          <span class="category">${transaction.category}</span>
          <span class="amount">${transaction.amount}</span>
          <span class="date">${transaction.date}</span>
          <span class="inout">${transaction.inout}</span>
        `;
        transactionList.appendChild(transactionElement);
      }
    }
  
    // Funktion zum Anzeigen der Transaktionen des ausgewählten Monats
    function displayTransactionsForMonth(month) {
      var filteredTransactions = transactions.filter(function(transaction) {
        return transaction.date.getMonth() === month;
      });
      displayTransactions(filteredTransactions);
    }

    function checkCategoryBudget(transactions, category) {
        var expenses = getCategoryExpenses(transactions, category);
        var budget = transactions[0].budget;
        if (expenses > budget) {
          alert(`Du hast dein Budget für die Kategorie "${category}" überschritten.`);
        }
      }
      

    function setCategoryBudget(transactions, category, budget) {
        for (var i = 0; i < transactions.length; i++) {
          var transaction = transactions[i];
          if (transaction.category === category) {
            transaction.budget = budget;
          }
        }
      }
      

    function getCategoryExpenses(transactions, category) {
        var expenses = 0;
        for (var i = 0; i < transactions.length; i++) {
          var transaction = transactions[i];
          if (transaction.category === category) {
            expenses += transaction.amount;
          }
        }
        return expenses;
      }
  
    // Event-Listener für das Transaktionsformular
    transactionForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      var category = categoryInput.value;
      var amount = amountInput.value;
      var date = dateInput.value;
      var cycle = cycleSelect.value;
  
      // Transaktionsobjekt erstellen
      var transaction = {
        category: category,
        amount: amount,
        date: new Date(date),
        cycle: cycle
      };
  
      // Transaktion zum Array hinzufügen
      addTransaction(transaction);
  
      // Transaktionen in der Liste anzeigen
      displayTransactions(transactions);
  
      // Transaktionsformular zurücksetzen
      transactionForm.reset();
    });
  
    // Event-Listener für die Monatsauswahl
    monthSelect.addEventListener('change', function(event) {
      var selectedMonth = event.target.value;
      displayTransactionsForMonth(selectedMonth);
    });
  
    // Transaktionen aus dem lokalen Speicher laden
    var transactionsFromStorage = localStorage.getItem('transactions');
    if (transactionsFromStorage) {
      transactions = JSON.parse(transactionsFromStorage);
    }
  
    // Transaktionen in der Liste anzeigen
    displayTransactions(transactions);
  });
  