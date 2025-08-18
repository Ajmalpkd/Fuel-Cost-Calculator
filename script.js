const TripDistance = document.getElementById("TripDistance")
const FuelPrice = document.getElementById("FuelPrice")
const Mileage = document.getElementById("Mileage")
const perhead = document.getElementById("perhead")
const btn = document.querySelector(".btn")
const result = document.querySelector(".result")
const reset = document.querySelector(".reset")
const rb = document.querySelector(".rb")
const resultbox = document.querySelector(".resultbox")
const resent = document.querySelector(".resent")
const Clear = document.querySelector(".Clear")



function calculate() {
    let distance = Number(TripDistance.value);
    let price = Number(FuelPrice.value);
    let Mvalue = Number(Mileage.value);
    let perheadone = Number(perhead.value);
    
    

    if (isNaN(distance) || isNaN(price) || isNaN(Mvalue) || distance <= 0 || price <= 0 || Mvalue <= 0) {
        result.innerHTML = `<span style="color: red;">Please enter valid \n positive numbers</span>`;
        return; 
    }

    let Fuel = (distance * price) / Mvalue;
    let Litter = Fuel/price;
    
   
    let one = Fuel / perheadone;
    if(perheadone === 0 || isNaN(perheadone)){
          result.innerHTML = `Fuel Cost Rs : <span style="color: red;">${parseFloat(Fuel).toFixed(0)}</span> 
Fuel Litter     : <span style="color: red;">${parseFloat(Litter).toFixed(0)} Litres</span> 
`;
    }else{
        
          result.innerHTML = `Fuel Cost Rs : <span style="color: red;">${parseFloat(Fuel).toFixed(0)}</span> 
Fuel Litter     : <span style="color: red;">${parseFloat(Litter).toFixed(0)} Litres</span>
Per Head Rs : <span style="color: red;">${parseFloat(one).toFixed(0)}</span>`;
    }



    // Resent Box
    
    let resentli = `Distance: ${distance}, Price: ${price}, Mileage: ${Mvalue}, Fuel Cost: ${parseFloat(Fuel).toFixed(0)}`;
    if(isFinite(one) && one !== 0){
          resentli += `, Per head: ${parseFloat(one).toFixed(0)}`;
    }
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
    perhead.value = "";
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

