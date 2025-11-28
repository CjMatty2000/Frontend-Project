async function adminTable() {
    try {
        const tbody = document.getElementById("product-table-body");
        const confirmBtn = document.getElementById("confirm-btn");
        const closeBtn = document.getElementById("close-btn");
        const addProductBtn = document.getElementById("add-product-btn");
        const message = document.querySelector(".message");
        const deleteMsg = document.querySelector(".delete-message");
        const editMsg = document.querySelector(".edit-message");

        // Fetch Data
        const response = await fetch("../data/app.json");
        const data = await response.json();

        tbody.innerHTML = "";

        const storedData = JSON.parse(localStorage.getItem("productData")) || [];

        // Redirect works always
        addProductBtn.addEventListener("click", () => {
            window.location.href = "adminupload.html";
        });

        // Empty message
        if (storedData.length === 0) {
            tbody.innerHTML = "<tr><td colspan='5'>No products available.</td></tr>";
        }

        // Populate rows
        storedData.forEach(item => {
            const trow = document.createElement("tr");
            trow.className = "product-row";

            let statusHtml;
            if (item.available === true){
                statusHtml = '<span class="status in-stock">In Stock</span>';
            } else {
                statusHtml = '<span class="status out-of-stock">Out of Stock</span>';
            }
            trow.innerHTML = `
                <td>
                    <div class="product-info">
                    <img src="${item.image}" alt="${item.name}" />
                    <p>${item.name}</p>
                    </div>
                </td>
                <td class="product-status">${item.status}</td>
                <td class="product-id">${item.id}</td>
                <td class="product-price">${item.price}</td>
                <td>
                    <div class="product-actions">
                        <button class="edit-btn" data-id="${item.id}">
                            <iconify-icon icon="bitcoin-icons:edit-filled" width="24" height="24"></iconify-icon>
                            Edit
                        </button>
                        <button class="delete-btn" data-id="${item.id}">
                            <iconify-icon icon="mdi:delete" width="24" height="24"></iconify-icon>
                            Delete
                        </button>
                    </div>
                </td>
                `
            ;
            tbody.appendChild(trow);
        });

        let deleteRow = null;
        let editRow = null;

        //edit form validity

        const editForm = document.getElementById("edit-form");
        const editImageInput = document.getElementById("edit-image-input");
        const editNameInput = document.getElementById("edit-product-name");
        const editPriceInput = document.getElementById("edit-product-price");
        const editStatusSelect = document.getElementById("edit-status");
        const editIdInput = document.getElementById("edit-product-id");
        const editImagePreview = document.getElementById("edit-image-preview");

        // Handle delete button click
        tbody.addEventListener("click", (e) => {
            const deleteBtn = e.target.closest(".delete-btn");
            const editBtn = e.target.closest(".edit-btn");
            if (deleteBtn) {
                message.classList.remove("hidden");
                deleteMsg.classList.remove("hidden");
                deleteRow = deleteBtn.closest("tr");
            }
            // Handle edit button click 
            if (editBtn) {
                 message.classList.remove("hidden");
                 editMsg.classList.remove("hidden");
                editRow = editBtn.closest("tr");

                // get the product id

                const productId = editRow.querySelector(".product-id").textContent;
                const product = storedData.find(item => item.id === productId);

                if(product){
                    editNameInput.value = product.name;
                    editPriceInput.value = product.price;
                    editStatusSelect.value = product.status;
                    editIdInput.value = product.id;
                    editImagePreview.src = product.image;
                }
            }
        });

        // Handle Confirm button
        confirmBtn.addEventListener("click", () => {
            if (deleteRow) {
                const productId = deleteRow.querySelector(".product-id").textContent;
                const updatedData = storedData.filter(item => item.id !== productId);
                localStorage.setItem("productData", JSON.stringify(updatedData));
                deleteRow.remove();
                deleteRow = null;
                message.classList.add("hidden");
                deleteMsg.classList.add("hidden");

                if(tbody.children.length === 0) {
                    tbody.innerHTML = "<tr><td colspan='5'>No products available.</td></tr>";
                }
            }
        });

        // Handle Close button
        closeBtn.addEventListener("click", () => {
            message.classList.add("hidden");
            deleteMsg.classList.add("hidden");
            deleteRow = null;
        });

        // Handle Edit form submission
       /*  editForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (editRow) {
                const productId = editRow.querySelector(".product-id").textContent;
                const product = storedData.find(item => item.id === productId);

                if (product) {
                    product.name = editNameInput.value;
                    product.price = editPriceInput.value;
                    product.status = editStatusSelect.value;

                    localStorage.setItem("productData", JSON.stringify(storedData));
                    editRow.querySelector(".product-info p").textContent = product.name;
                    editRow.querySelector(".product-price").textContent = product.price;
                    editRow.querySelector(".product-status").textContent = product.status;

                    message.classList.add("hidden");
                    editMsg.classList.add("hidden");
                    editRow = null;
                }
            }
        }); */

    } catch (error) {
        console.error(error);
        const tbody = document.getElementById("product-table-body");
        tbody.innerHTML = "<tr><td colspan='5'>Sorry, an error occurred while fetching the data.</td></tr>";
    }
}

adminTable();
