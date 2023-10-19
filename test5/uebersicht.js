document.addEventListener('DOMContentLoaded', function() {
     // Lade die Transaktionen aus dem localStorage
    var transactionsFromStorage = localStorage.getItem('transactions');
    var transactions = transactionsFromStorage ? JSON.parse(transactionsFromStorage) : [];
/*
    // Verarbeite die Daten, um sie für das Diagramm vorzubereiten
    var data = {
        labels: ['Einnahmen', 'Ausgaben'],
        datasets: [{
            data: [0, 0],
            backgroundColor: ['#2f7d6d', '#f44336']
        }]
    };

    transactions.forEach(function(transaction) {
        if (transaction.inout === 'Einnahmen') {
            data.datasets[0].data[0] += transaction.amount;
        } else if (transaction.inout === 'Ausgaben') {
            data.datasets[0].data[1] += transaction.amount;
        }
    });

    // Erstelle das Diagramm
    var ctx = document.getElementById('transactionChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    
                }
            }
        }}); */

        function createLineChart() {
            // Filtern der Einnahmen und Ausgaben in separate Arrays
            var incomeData = transactions.filter(function(transaction) {
                return transaction.inout === "Einnahmen";
            });
        
            var expenseData = transactions.filter(function(transaction) {
                return transaction.inout === "Ausgaben";
            });
        
            // Extrahieren der Labels und Daten für Einnahmen
            var incomeLabels = incomeData.map(function(transaction) {
                return new Date(transaction.date).toDateString();
            });
            var incomeValues = incomeData.map(function(transaction) {
                return transaction.amount;
            });
        
            // Extrahieren der Labels und Daten für Ausgaben
            var expenseLabels = expenseData.map(function(transaction) {
                return new Date(transaction.date).toDateString();
            });
            var expenseValues = expenseData.map(function(transaction) {
                return transaction.amount;
            });

            console.log(incomeLabels)
        
            var ctx = document.getElementById('transactionChart').getContext('2d');
            var chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: incomeLabels, // Verwenden Sie die Labels eines der Datensätze (z. B. Einnahmen)
                    datasets: [
                        {
                            label: 'Einnahmen',
                            data: incomeValues,
                            borderColor: 'green',
                            fill: false
                        },
                        {
                            label: 'Ausgaben',
                            data: expenseValues,
                            borderColor: 'red',
                            fill: false
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'Betrag'
                            }
                        }
                    }
                }
            });
        }        

        createLineChart();
    
});

