
let itemNumber = document.getElementById("item-number");
console.log(itemNumber);

let count = 0;

function increment() {
    count = count + 1;
    itemNumber.innerText = count;
}