async function InitializationShopping() {
    const myListItem = document.getElementById("Mylist-items"); 
    const asideContainer = document.getElementById("aside-container"); 
    const cartIcon = document.getElementById("cart-icon");
    const hideAsideContainer = document.getElementById("hide-aside-container");
    const emptyCart = document.querySelector(".cart-empty"); 
    const displayCart = document.querySelector(".cart-display"); 
    const cartCount = document.querySelector(".count");
    const cartList = document.querySelector(".cart-list");  
    const cartTotalAmount = document.querySelector(".total-amount");
    const searchItem = document.getElementById("cart-search");
    const searchList = document.getElementById("search-list");
    const searchBtn = document.getElementById("search-btn");
    const placeOrderBtn = document.getElementById("place-order")

    let cart = []; 


    try {
        const menuToggle = document.getElementById("menu-toggle");
        const iconsContainer = document.querySelector(".icons-container");

        menuToggle.addEventListener("click", () => {
        iconsContainer.classList.toggle("active");
        });

        const response = await fetch("../data/app.json");
        const data = await response.json();

       // Reset the itemlist 
        myListItem.innerHTML = "";
        
        // Add data-id to each product
        const products = data.Menu.map(items => {
            return `
            <li class="list-product" data-id="${items.id}">

            <div class="product-img-wrapper">
                <img src="${items.image}" alt="${items.Name}">
            </div>

                <div class="product-info">
                <h3>${items.Name}</h3>
                <p>₦${items.price.toLocaleString()}</p>
                </div>

                <p class = "description"> ${items.description} </p>

                <div class = "item-ratting-cart">
                <p class =  "product-ratting">Ratting: ${items.ratting} 
                <iconify-icon icon="fluent-color:star-48" class = "product-ratting-icon"></iconify-icon>
                </p>
                <button class="btn">Add to Cart</button>
                </div>

            </li>
            `;
        }).join("");

         myListItem.classList.remove("hidden");
         searchList.classList.add("hidden");
        myListItem.innerHTML = products;

      // Add event listener once for both lists

            myListItem.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn")) {
            const productId = e.target.closest("li").dataset.id;
            addToCart(productId);
        }
        });

        function saveCart(){
           localStorage.setItem("myCart", JSON.stringify(cart));
            
       } 

     function addToCart(productId) {
     const productDetails = data.Menu.find(productItem=> productItem.id == productId);
     const productIndex = cart.findIndex(item => item.id == productId);

    if (productIndex < 0) {
        cart.push({ ...productDetails, quantity: 1 });
    } else {
        cart[productIndex].quantity += 1;
    }

    saveCart();
    renderCart();
}


      function renderCart() {
    cartList.innerHTML = "";

    let itemCount = 0;
    let totalAmount = 0;

    if (cart.length === 0) {
        displayCart.classList.add("hidden");
        emptyCart.style.display = "flex";
        cartCount.textContent = 0;
        cartTotalAmount.textContent = "₦0.00";
        return;
    }

    displayCart.classList.remove("hidden");
    emptyCart.style.display = "none";

    cart.forEach(cartItem => {
    itemCount += cartItem.quantity;
    totalAmount += cartItem.quantity * cartItem.price;

    const newProduct = document.createElement("li");
    newProduct.className = "cart-item";
    newProduct.setAttribute("data-id", cartItem.id);

    newProduct.innerHTML = `
        <img src="${cartItem.image}" alt="${cartItem.Name}">
        <div class="item-detail">
            <h3>${cartItem.Name}</h3>
            <article>
                <p>@₦${cartItem.price}</p>
                <p class="item-price">₦${cartItem.price * cartItem.quantity}</p>
            </article>
        </div>
        <div class="item-quantity">
            <span class="decrease-quantity"><</span>
            <span class="cartitem-quantity">${cartItem.quantity}</span>
            <span class="increase-quantity">></span>
        </div>
    `;


        const decreaseBtn = newProduct.querySelector(".decrease-quantity");
        const increaseBtn = newProduct.querySelector(".increase-quantity");

        decreaseBtn.addEventListener("click", () => {
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
            } else {
                cart = cart.filter(item => item.id !== cartItem.id);

            }
            saveCart();
            renderCart();
        });

        increaseBtn.addEventListener("click", () => {
            cartItem.quantity += 1;
            saveCart();
            renderCart();
        });

        cartList.appendChild(newProduct);
    });

    cartCount.textContent = itemCount;
    cartTotalAmount.textContent = `₦${totalAmount.toLocaleString()}`;
}
     
          // Search functionality

          function performSearch(searchTerm){

            const allProduct = data.Menu;

             if (searchTerm === "") {
                searchList.classList.add("hidden");
                myListItem.classList.remove("hidden");
                searchList.innerHTML = ""; 
                return;
            };

             const filteredProducts = allProduct.filter(product => 
                product.Name.toLowerCase().includes(searchTerm) || 
                product.description.toLowerCase().includes(searchTerm)
            );

            if (filteredProducts.length > 0) {
                const searchResults = filteredProducts.map(items => {
                    return `
                    <li class="list-product" data-id="${items.id}">
                    <div class="product-img-wrapper">
                    <img src="${items.image}" alt="${items.Name}">
                    </div>
                    <div class="product-info">
                    <h3>${items.Name}</h3>
                     <p>₦${items.price.toLocaleString()}</p>
                    </div>
                    <p class = "description"> ${items.description} </p>
                    <div class = "item-ratting-cart">
                    <p class =  "product-ratting">Ratting: ${items.ratting} 
                    <iconify-icon icon="fluent-color:star-48" class = "product-ratting-icon"></iconify-icon>
                    </p>
                    <button class="btn">Add to Cart</button>
                    </div>
                    </li>
                    `;
                }).join("");
               myListItem.classList.add("hidden");      
                searchList.classList.remove("hidden");   
                searchList.innerHTML = searchResults;  
            }  else {
                myListItem.classList.add("hidden");       
                searchList.classList.remove("hidden");
                searchList.innerHTML = `
                <section class = "error-search">
                <h2> No item found, Try searching with a different keyword. </h2>
                
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width="200" height="80" role="img" aria-label="Oops">

            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" > Oops! </text>

            </svg>
                </section>
                `;
            };

            searchList.addEventListener("click", (e) => {
            if (e.target.classList.contains("btn")) {
                const productId = e.target.closest("li").dataset.id;
                addToCart(productId);
            }
            });

     }    
     
       searchItem.addEventListener("input", (event) => {
            const searchTerm = event.target.value.toLowerCase().trim();
            performSearch(searchTerm);
       });

       searchBtn.addEventListener("click", () => {
            const term = searchItem.value.toLowerCase().trim();
            if (!term) {
                alert("Please enter a search term");
            } else {
                performSearch(term);
            }
        });


        // asideContainer Toggle
        cartIcon.addEventListener("click", () => {
            asideContainer.classList.toggle("active");
        });

        hideAsideContainer.addEventListener("click", () => {
            asideContainer.classList.remove("active");
        });

        placeOrderBtn.addEventListener("click", () => {
            window.location.href = "/pages/invoice.html"
        });

    } catch (error) {
        myListItem.textContent = "Sorry an error occurred while fetching the data.";
    }

    if (localStorage.getItem("myCart")) {
    cart = JSON.parse(localStorage.getItem("myCart"));
    renderCart();  
}

}

InitializationShopping();
