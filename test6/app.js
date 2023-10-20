document.addEventListener('DOMContentLoaded', function() {
    var transactionForm = document.getElementById('transactionForm');
    var monthSelect = document.getElementById('date');
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
        updateLocalStorage();
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
                <span class="date">${new Date(transaction.date)
                    .toLocaleDateString('de-DE', {day: '2-digit', month: 'short', year: 'numeric'})}</span>
                <span class="inout">${transaction.inout}</span>
                <button id=${'buttonID-' + transaction.id} class="delete" />
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

    // Funktion zum Aktualisieren des localStorage
    function updateLocalStorage() {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }

    // Laden der Transaktionen aus dem localStorage
    function loadTransactionsFromLocalStorage() {
        var transactionsFromStorage = localStorage.getItem('transactions');
        if (transactionsFromStorage) {
            transactions = JSON.parse(transactionsFromStorage);
            displayTransactions(transactions);
        }
    }

    // Lade Transaktionen aus dem localStorage beim Start
    loadTransactionsFromLocalStorage();

    // Event-Listener für das Transaktionsformular
    transactionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var id = Math.floor(Math.random() * 1000);
        var category = categoryInput.value;
        var amount = amountInput.value;
        var date = new Date;
        date = dateInput.value;
        var cycle = cycleSelect.value;
        var inout = document.querySelector('input[name="inout"]:checked').value;

        // Transaktionsobjekt erstellen
        var transaction = {
            id: id,
            category: category,
            amount: amount,
            date: new Date(date),
            cycle: cycle,
            inout: inout
        };

        // Transaktion zum Array hinzufügen
        addTransaction(transaction);

        // Transaktionen in der Liste anzeigen
        displayTransactions(transactions);

        // Transaktionsformular zurücksetzen
        transactionForm.reset();
        location.reload();
    });

    // Event-Listener für die Monatsauswahl
    monthSelect.addEventListener('change', function(event) {
        var selectedMonth = event.target.value;
        displayTransactionsForMonth(selectedMonth);
    });

    var deleteBtnList = document.querySelectorAll('.delete');

    deleteBtnList.forEach(function(deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            var id = deleteBtn.id;
            var transactionIndex = transactions.findIndex(function(transaction) {
                return transaction.id === parseInt(id.split('-')[1]);
            })
            transactions.splice(transactionIndex, 1);
            updateLocalStorage();
            displayTransactions(transactions);
            location.reload();
        })
    })

});