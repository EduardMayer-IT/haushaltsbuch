const category = document.getElementById('category');
const amount = document.getElementById('amount');
const date = document.getElementById('date');
const inout = document.getElementById('inout');

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    category: category.value,
    amount: amount.value,
    date: date.value,
    inout: inout.value
  };
  console.log(data);
});
