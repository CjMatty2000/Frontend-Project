
let nameItem = document.querySelector(".receipt-name")
let receipt1 = document.querySelectorAll(".receipt")
let overlay1 = document.querySelectorAll(".overlay")
let nav1 = document.querySelector("nav")
let menuIcon = document.querySelector(".material-symbols-light--menu-rounded")
let parent = document.querySelector(".icon-place")
let display1 = document.querySelectorAll(".right")
let productPrice = document.querySelectorAll("#price1")
let productQauntity = document.querySelectorAll("#quantity1")
let term = document.querySelectorAll(".term")
let totalOne = document.querySelectorAll(".total")

let receipiant = document.querySelector(".Receipent-name");
let  Gender = document.querySelector(".sex-type");
let city = document.querySelector(".place");
let phoneNumber = document.querySelector(".phone-number");
let customerId = document.querySelector(".customer-identification");
let email = document.querySelector(".place-from");
let textArea = document.querySelector(".text-place")

let inputData = () => {
    let newReciepiant = receipiant.value;
    let genderPlace = Gender.value;
    let cityPlace = city.value;
    let phonePlace = phoneNumber.value;
    let customerPlace = customerId.value;
    let emailPlace = email.value;
    let textPlace = textArea.value;

    nameItem.innerHTML = newReciepiant
}
inputData()

function display(){
    overlay1.forEach($term => {
        $term.style.display = "block"
    })
}

menuIcon.addEventListener("click", () => {
    parent.classList.toggle("arrange")
})




let cart = [];
let totalQuantity = 0;
let totalPrice = 0;

let removeItem = (idproduct, $type) => {
    switch ($type) {
        case 'ic--outline-close':
            cart = cart.filter(product => product.id !== idproduct);
            localStorage.setItem("myCart", JSON.stringify(cart));
            break;
    }
    renderCart();
};


let renderCart = () => {
    totalPrice = 0;
    totalQuantity = 0;

    if (cart) {
        display1.forEach(container => {
            container.innerHTML = ""; 

            cart.forEach(product => {
                let element = document.createElement("div");
                element.classList.add("item");
                element.innerHTML = `
                    <div class="image-page">
                        <img src="${product.image}" alt="image">
                    </div>
                    <div class="name">
                        <p>${product.Name}</p>
                    </div>
                    <div class="price">
                        <p>₦${product.price * product.quantity}</p>
                    </div>
                    <div class="quantity">
                        <p>quantity: ${product.quantity}</p>
                    </div>
                    <div class="remove">
                        <span class="ic--outline-close" onclick="removeItem(${product.id},'ic--outline-close')"></span>
                    </div>
                `;
                container.appendChild(element);

                
                 totalPrice = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
                 totalQuantity = cart.reduce((sum, product) => sum + product.quantity, 0);

            });
        });

         productPrice.forEach(put1 => put1.innerText = `₦${totalPrice}`)
         productQauntity.forEach(put2 => put2.innerText = totalQuantity)
    }

    console.log(totalPrice);
};


if (localStorage.getItem("myCart")) {
    cart = JSON.parse(localStorage.getItem("myCart"));
    renderCart();
}

let receiptHtml = () => {
    let total = 0;

    term.forEach($item => {
        $item.innerHTML = "";
        cart.forEach($product => {
            let element = document.createElement("div");
            element.classList.add("item1");
            element.innerHTML = `
        
            <div><h2 class="name">${$product.Name}</h2></div>
            <div><p class="quantity">${$product.quantity}</p></div>
            <div><p class="price">₦${$product.price * $product.quantity}</p></div>
            `
            $item.appendChild(element)

            total = cart.reduce((sum, $product) =>  sum + $product.price * $product.quantity, 0)
            totalOne.forEach(item3 => {
                item3.innerText = `₦${total}`
            })
        })
    })
}
receiptHtml()
