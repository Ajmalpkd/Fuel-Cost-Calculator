const TripDistance = document.getElementById("TripDistance")
const FuelPrice = document.getElementById("FuelPrice")
const Mileage = document.getElementById("Mileage")
const btn = document.querySelector(".btn")
const result = document.querySelector(".result")
const reset = document.querySelector(".reset")
const rb = document.querySelector(".rb")
const resultbox = document.querySelector(".resultbox")
const resent = document.querySelector(".resent")
const Clear = document.querySelector(".Clear")

// let resentli  

// function setlocalstorage(){
//        // Set to localstorage
//     localStorage.setItem('Fuel',resentli);
// }

// function getlocalstorage(){
//       // Get from localstorage
//     const Fuelget = localStorage.getItem('Fuel');
//   console.log(Fuelget);
  
// }



// function calculate(){
//     let distance = Number (TripDistance.value) 
//     let price = Number (FuelPrice.value)
//     let Mvalue = Number (Mileage.value)

//     if (isNaN(distance) || isNaN(price) || isNaN(Mvalue) || distance <= 0 || price <= 0 || Mvalue <= 0) {
//     result.textContent = "Please enter valid \n positive numbers.";
//     return; 
//     }
    // setlocalstorage()
    // getlocalstorage()

    // let Fuel = (distance * price) / Mvalue;
    // result.textContent =`This trip will require amounts to a fuel cost of ${Fuel.toFixed(2)}`;

   

// Resnt Box 
//     let li= document.createElement("li")
//     li.classList.add("li")
//     let resentli = `Distance: ${distance}, Price: ${price}, Mileage: ${Mvalue},Fuel Cost${Fuel.toFixed(2)}`
//     li.textContent = resentli;
//     resent.appendChild(li) 
// }

// function clear(){
//     TripDistance.value = ""
//     FuelPrice.value = ""
//     Mileage.value = ""
//     result.textContent = ""
// }

// function resentClear(){
//    const listItems = resent.querySelectorAll('li'); // Select all <li> elements within the 'resent' container
//     listItems.forEach(item => {
//         item.remove();});
// }

function calculate() {
    let distance = Number(TripDistance.value);
    let price = Number(FuelPrice.value);
    let Mvalue = Number(Mileage.value);

    if (isNaN(distance) || isNaN(price) || isNaN(Mvalue) || distance <= 0 || price <= 0 || Mvalue <= 0) {
        result.innerHTML = `<span style="color: red;">Please enter valid \n positive numbers.</span>`;
        return; 
    }

    let Fuel = (distance * price) / Mvalue;
    let Litter = Fuel/price
    console.log(Litter);
    
  result.innerHTML = `This trip will require a fuel cost of Rs <span style="color: red;">${parseFloat(Fuel).toFixed(0)}</span> You will need approximately <span style="color: red;">${parseFloat(Litter).toFixed(0)} Litres</span> of fuel.`;


    // Resent Box
    let resentli = `Distance: ${distance}, Price: ${price}, Mileage: ${Mvalue}, Fuel Cost: ${parseFloat(Fuel).toFixed(0)}`;
    let li = document.createElement("li");
    li.classList.add("li");
    li.textContent = resentli;
    resent.appendChild(li);

    // 🔹 Save to localStorage (array of items)
    let history = JSON.parse(localStorage.getItem("FuelHistory")) || [];
    history.push(resentli);
    localStorage.setItem("FuelHistory", JSON.stringify(history));
}

// Load resent history from localStorage when page refreshes
window.addEventListener("load", () => {
    let history = JSON.parse(localStorage.getItem("FuelHistory")) || [];
    history.forEach(item => {
        let li = document.createElement("li");
        li.classList.add("li");
        li.textContent = item;
        resent.appendChild(li);
    });
});

// Clear input fields
function clear() {
    TripDistance.value = "";
    FuelPrice.value = "";
    Mileage.value = "";
    result.textContent = "";
}

// Clear resent list + localStorage
function resentClear() {
    resent.innerHTML = "";
    localStorage.removeItem("FuelHistory");
}

btn.addEventListener("click",calculate)
reset.addEventListener("click",clear)
Clear.addEventListener("click",resentClear)

