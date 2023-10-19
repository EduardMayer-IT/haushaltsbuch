document.addEventListener('DOMContentLoaded', function() {
  var transactionForm = document.getElementById('transactionForm');
  var monthSelect = document.getElementById('monthSelect');
  var transactionList = document.getElementById('transactionList');
  var categoryInput = document.querySelector('#category');
  var amountInput = document.querySelector('#amount');
  var dateInput = document.querySelector('#date');
  var cycleSelect = document.querySelector('#cycle');

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
});
