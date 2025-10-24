let overlay = document.querySelector(".overlay");
let receipt = document.querySelector(".receipt");
let right1 = document.querySelector(".right-1")
let subContainer = document.querySelector(".sub-container")
let term = document.querySelector(".term")
let totalOne = document.querySelector(".total")
let menuIcon = document.querySelector(".mynaui--menu")
let parent = document.querySelector(".icon-place")



menuIcon.addEventListener("click", () => {
    parent.classList.toggle("arrange")
});
console.log("Menu icon:", menuIcon);
console.log("Parent:", parent);


function Display(){
     overlay.style.display = "block"
}

let cart = [];
let totalQuantity = 0;
let totalPrice = 0;


let rederCrt = () => {
    totalPrice = 0;
    totalQuantity = 0;
    
    if(cart && cart.length > 0){
        right1.innerHTML = `
        <div class="div1">
            <h1>Order#20236</h1>
            <h3>paid</h3>
        </div>
        
        <div class="contain">
            <h3>Details</h3>
            <div class="div10">
                <p>Tabel NO</p>
                <p>Guest</p>
                <p>Customer</p>
                <p>payment</p>
            </div>
            <div class="div11">
                <p>20</p>
                <p>4</p>
                <p>Moanees</p>
                <p>Cash</p>
            </div>
        </div>
        <div class="container">
            <h1>order</h1>
            <div class="sub-container">
            </div>
            <button onclick="Display()">Print Invoice</button>
        </div>
        `;
        
        subContainer = document.querySelector(".sub-container");
        subContainer.innerHTML = "";
        
        cart.forEach(item => {
            let element = document.createElement("div");
            element.classList.add("item");
            element.innerHTML = `
                <div><img src="${item.image}" alt="${item.Name}"></div> 
                <div><h3>${item.Name}</h3></div>
                <div><p>x:${item.quantity}</p></div>
                <div><h4>₦${item.price * item.quantity}</h4></div>
            `;
            subContainer.appendChild(element);
        });
    } else {
        right1.innerHTML = `
        <p class ="myp">No Order Detail</p>
        `;
    }
}

let receiptHtml = () => {
    let total = 0;
    term.innerHTML = ""
    cart.map(item => {
        let element = document.createElement("div");
        element.classList.add("item1");
        element.innerHTML = `
        <div><h2 class="name">${item.Name}</h2></div>
        <div><p class="quantity">${item.quantity}</p></div>
        <div><p class="price">₦${item.price * item.quantity}</p></div>
        `
        term.appendChild(element)
        total = cart.reduce((sum, $product) =>  sum + $product.price * $product.quantity, 0)
        totalOne.innerText = `₦${total}`
    })
}

if (localStorage.getItem("myCart")) {
    cart = JSON.parse(localStorage.getItem("myCart"));
    rederCrt();
    receiptHtml();
} else {
    rederCrt();

}


