// import { wallet } from './client.json';

// const codes = {
//     "RELEASE10": 10.00,
//     "TEST50": 50.00,
//     "TEST100": 100.00,
//     "TEST1000": 1000.00
// };

// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('promoForm');
//     form.addEventListener('submit', function(e) {
//         e.preventDefault(); // Impede a atualização da página
//         const codeInput = document.getElementById('promoCode').value.trim();
//         reendem(codeInput);
//     });
// });

// function reendem(code) {
//     if (!code) {
//         alert("Insira um código promocional no campo!");
//         return;
//     }

//     if (codes.hasOwnProperty(code)) {
//         const value = codes[code];
//         wallet.balance += value;
//         alert(`Você acaba de adicionar R$ ${value} com o código "${code}"!`);
//     } else {
//         alert("Código promocional inválido!");
//     }
// }
