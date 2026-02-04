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
    const placeOrderBtn = document.getElementById("place-order");

    let cart = []; 

    try {
        function saveCart(){
            localStorage.setItem("myCart", JSON.stringify(cart));
        } 

        const menuToggle = document.getElementById("menu-toggle");
        const iconsContainer = document.querySelector(".icons-container");

        menuToggle.addEventListener("click", () => {
            iconsContainer.classList.toggle("active");
        });

        // Get menu from localStorage
        let menuArray = JSON.parse(localStorage.getItem("productData"));

        // If no menu in localStorage, create default with quantity
        
        
        myListItem.innerHTML = "";

        // Display products with stock status
        const products = menuArray.map(items => {
            const availableQuantity = items.quantity || 0;
            const cartItem = cart.find(cartItem => cartItem.id == items.id);
            const inCartQuantity = cartItem ? cartItem.quantity : 0;
            const remainingQuantity = availableQuantity - inCartQuantity;
            const isOutOfStock = availableQuantity <= 0;
            const canAddMore = remainingQuantity > 0;
            
            return `
            <li class="list-product" data-id="${items.id}">
                <div class="product-img-wrapper">
                    <img src="${items.image}" alt="${items.Name}">
                </div>
                <div class="content">
                    <div class="product-info">
                        <h3>${items.name}</h3>
                        <p>₦${items.price.toLocaleString()}</p>
                    </div>
                    <p class="description">A nice meal that is cooked with love</p>
        
                    
                    <div class="item-ratting-cart">
                        <p class="product-ratting">Rating: 4.5 
                            <iconify-icon icon="fluent-color:star-48" class="product-ratting-icon"></iconify-icon>
                        </p>
                        
                        ${isOutOfStock ? 
                            '<button class="btn" disabled style="opacity:0.5; cursor:not-allowed;">Out of Stock</button>' : 
                            !canAddMore ? 
                                '<button class="btn" disabled style="opacity:0.5; cursor:not-allowed;">Max Quantity Reached</button>' :
                                '<button class="btn">Add to Cart</button>'
                        }
                    </div>
                </div>
            </li>
            `;
        }).join("");

        myListItem.classList.remove("hidden");
        searchList.classList.add("hidden");
        myListItem.innerHTML = products;

        // Load cart
        if (localStorage.getItem("myCart")) {
            cart = JSON.parse(localStorage.getItem("myCart"));
            renderCart();  
        }

        function updateButtonsState() {
            document.querySelectorAll(".btn").forEach(btn => {
                const productId = btn.closest("li").dataset.id;
                const product = menuArray.find(item => item.id == productId); // FIXED: Use menuArray
                const cartItem = cart.find(item => item.id == productId);
                
                if (!product) return;
                
                const availableQuantity = product.quantity || 0;
                const inCartQuantity = cartItem ? cartItem.quantity : 0;
                const canAddMore = (availableQuantity - inCartQuantity) > 0;
                
                if (cartItem) {
                    btn.innerHTML = `
                        <div class="btn-quantity-control">
                            <button class="btn-decrease" data-id="${productId}">-</button>
                            <span class="btn-quantity">${cartItem.quantity}</span>
                            <button class="btn-increase" data-id="${productId}" 
                                    ${!canAddMore ? 'disabled style="opacity:0.5"' : ''}>+</button>
                        </div>
                    `;
                } else {
                    if (availableQuantity <= 0) {
                        btn.textContent = "Out of Stock";
                        btn.disabled = true;
                        btn.style.opacity = "0.5";
                        btn.style.cursor = "not-allowed";
                    } else {
                        btn.textContent = "Add to Cart";
                        btn.disabled = false;
                        btn.style.opacity = "1";
                        btn.style.cursor = "pointer";
                    }
                }
            });
            
            attachQuantityControlEvents();
        }

        updateButtonsState();

        function attachQuantityControlEvents() {
            document.querySelectorAll('.btn-decrease').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const productId = e.target.dataset.id;
                    const cartItem = cart.find(item => item.id == productId);
                    
                    if (cartItem.quantity > 1) {
                        cartItem.quantity -= 1;
                    } else {
                        cart = cart.filter(item => item.id != productId);
                    }
                    
                    saveCart();
                    renderCart();
                });
            });

            document.querySelectorAll('.btn-increase').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const productId = e.target.dataset.id;
                    const cartItem = cart.find(item => item.id == productId);
                    const product = menuArray.find(item => item.id == productId); // FIXED: Use menuArray
                    
                    if (!product || !cartItem) return;
                    
                    const availableQuantity = product.quantity || 0;
                    
                    if (cartItem.quantity >= availableQuantity) {
                        alert(`Cannot add more. Only ${availableQuantity} items available.`);
                        return;
                    }
                    
                    cartItem.quantity += 1;
                    saveCart();
                    renderCart();
                });
            });
        }

        function addToCart(productId) {
            const productDetails = menuArray.find(productItem => productItem.id == productId); 
            
            
            const availableQuantity = productDetails.quantity || 0;
            const existingCartItem = cart.find(item => item.id == productId);
            const currentCartQuantity = existingCartItem ? existingCartItem.quantity : 0;
            
            if (currentCartQuantity >= availableQuantity) {
                alert(`Sorry, only ${availableQuantity} items available!`);
                return;
            }
            
            if (existingCartItem) {
                existingCartItem.quantity += 1;
            } else {
                cart.push({ 
                    ...productDetails, 
                    quantity: 1 
                });
            }
            
            saveCart();
            renderCart();
            updateButtonsState();
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
                updateButtonsState();
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
                    const product = menuArray.find(item => item.id == cartItem.id);
                    const availableQuantity = product ? product.quantity || 0 : 0;
                    
                    if (cartItem.quantity >= availableQuantity) {
                        alert(`Cannot add more. Only ${availableQuantity} available.`);
                        return;
                    }
                    
                    cartItem.quantity += 1;
                    saveCart();
                    renderCart();
                });

                cartList.appendChild(newProduct);
            });

            cartCount.textContent = itemCount;
            cartTotalAmount.textContent = `₦${totalAmount.toLocaleString()}`;
            updateButtonsState();
        }

        renderCart();

        myListItem.addEventListener("click", (e) => {
            if (e.target.classList.contains("btn")) {
                const productId = e.target.closest("li").dataset.id;
                addToCart(productId);
            }
        });

        function performSearch(searchTerm) {
            const allProduct = menuArray;

            if (searchTerm === "") {
                searchList.classList.add("hidden");
                myListItem.classList.remove("hidden");
                searchList.innerHTML = ""; 
                updateButtonsState();
                return;
            }

            const filteredProducts = allProduct.filter(product => 
                product.Name.toLowerCase().includes(searchTerm) || 
                product.description.toLowerCase().includes(searchTerm)
            );

            if (filteredProducts.length > 0) {
                const searchResults = filteredProducts.map(items => {
                    const availableQuantity = items.quantity || 0;
                    const cartItem = cart.find(cartItem => cartItem.id == items.id);
                    const inCartQuantity = cartItem ? cartItem.quantity : 0;
                    const remainingQuantity = availableQuantity - inCartQuantity;
                    const isOutOfStock = availableQuantity <= 0;
                    const canAddMore = remainingQuantity > 0;
                    
                    return `
                    <li class="list-product" data-id="${items.id}">
                        <div class="product-img-wrapper">
                            <img src="${items.image}" alt="${items.Name}">
                        </div>
                        <div class="product-info">
                            <h3>${items.Name}</h3>
                            <p>₦${items.price.toLocaleString()}</p>
                        </div>
                        <p class="description">${items.description}</p>
                        
                        <div class="stock-status">
                            ${isOutOfStock ? 
                                '<span class="out-of-stock-badge">Out of Stock</span>' : 
                                `<span class="in-stock-badge">${remainingQuantity} left</span>`
                            }
                        </div>
                        
                        <div class="item-ratting-cart">
                            <p class="product-ratting">Ratting: ${items.ratting} 
                                <iconify-icon icon="fluent-color:star-48" class="product-ratting-icon"></iconify-icon>
                            </p>
                            
                            ${isOutOfStock ? 
                                '<button class="btn" disabled style="opacity:0.5; cursor:not-allowed;">Out of Stock</button>' : 
                                !canAddMore ? 
                                    '<button class="btn" disabled style="opacity:0.5; cursor:not-allowed;">Max Quantity Reached</button>' :
                                    '<button class="btn">Add to Cart</button>'
                            }
                        </div>
                    </li>
                    `;
                }).join("");
                
                myListItem.classList.add("hidden");      
                searchList.classList.remove("hidden");   
                searchList.innerHTML = searchResults;  
            } else {
                searchList.innerHTML = `
                <section class="error-search">
                    <h2>No item found, Try searching with a different keyword.</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width="200" height="80" role="img" aria-label="Oops">
                        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">Oops!</text>
                    </svg>
                </section>
                `;

                myListItem.classList.add("hidden");       
                searchList.classList.remove("hidden");
            }

            updateButtonsState();
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

        searchList.addEventListener("click", (e) => {
            if (e.target.classList.contains("btn")) {
                const productId = e.target.closest("li").dataset.id;
                addToCart(productId);
            }
        });

        cartIcon.addEventListener("click", () => {
            asideContainer.classList.toggle("active");
        });

        hideAsideContainer.addEventListener("click", () => {
            asideContainer.classList.remove("active");
        });

        placeOrderBtn.addEventListener("click", () => {
            window.location.href = "/pages/invoice.html";
        });

    } catch (error) {
        console.error(error);
        myListItem.textContent = "Sorry an error occurred while fetching the data.";
    }

    const allLinks = document.querySelectorAll('.picture');
       const currentPage = window.location.pathname.split('/').pop();
    allLinks.forEach(link => {
         const linkpage = link.getAttribute('href')

         if (linkpage) {
         const href = linkpage.split('/').pop();
          link.classList.toggle('active', href === currentPage);
     } else {
         link.classList.remove('active');
     }
    })
}

InitializationShopping();



/*async function InitializationShopping() {
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

         function saveCart(){
           localStorage.setItem("myCart", JSON.stringify(cart));
            
       } 

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

            <div class="content">

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

          </div>

                

            </li>
            `;
        }).join("");

         myListItem.classList.remove("hidden");
         searchList.classList.add("hidden");
        myListItem.innerHTML = products;

         if (localStorage.getItem("myCart")) {
    cart = JSON.parse(localStorage.getItem("myCart"));
    renderCart();  
}


    function updateButtonsState() {
 document.querySelectorAll(".btn").forEach(btn => {
    const id = btn.closest("li").dataset.id;

    // Check if this product is in localStorage cart
    const isInCart = cart.find(item => item.id == id);

    if (isInCart) {
        btn.innerHTML = `<div class="btn-quantity-control">
                    <button class="btn-decrease" data-id="${id}">-</button>
                    <span class="btn-quantity">${isInCart.quantity}</span>
                    <button class="btn-increase" data-id="${id}">+</button>
                </div>`

    }else{
        btn.textContent = "Add to cart";
    }
});
attachQuantityControlEvents();
}


updateButtonsState();



function attachQuantityControlEvents() {
    document.querySelectorAll('.btn-decrease').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            const cartItem = cart.find(item => item.id == productId);
            
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
            } else {
                cart = cart.filter(item => item.id != productId);
            }
            
            saveCart();
            renderCart();
        });
    });


    document.querySelectorAll('.btn-increase').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            const cartItem = cart.find(item => item.id == productId);
            
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                // If item somehow doesn't exist in cart, add it
                addToCart(productId);
                return;
            }
            
            saveCart();
            renderCart();
        });
    });
}

// add to cart section
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
        updateButtonsState();
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
                updateButtonsState();
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
    updateButtonsState();
}
        renderCart();

         // Add event listener once for both lists

            myListItem.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn")) {
            const productId = e.target.closest("li").dataset.id;
            addToCart(productId);
        }
        });
     
          // Search functionality

          function performSearch(searchTerm){

            const allProduct = data.Menu;

             if (searchTerm === "") {
                searchList.classList.add("hidden");
                myListItem.classList.remove("hidden");
                searchList.innerHTML = ""; 
                updateButtonsState();
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
                searchList.innerHTML = `
                <section class = "error-search">
                <h2> No item found, Try searching with a different keyword. </h2>
                
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width="200" height="80" role="img" aria-label="Oops">

            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" > Oops! </text>

            </svg>
                </section>
                `;

                 myListItem.classList.add("hidden");       
                searchList.classList.remove("hidden");
            };

           
            updateButtonsState();

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

         searchList.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
        const productId = e.target.closest("li").dataset.id;
        addToCart(productId);
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

}

InitializationShopping();*/
