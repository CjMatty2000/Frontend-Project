
async function adminTable() {
    try {
        const tbody = document.getElementById("product-table-body");
         const message = document.querySelector(".message");
        const response = await fetch("../data/app.json");
        const data = await response.json();
       
        tbody.innerHTML = "";
    
        data.Menu.forEach(item => {
            const trow = document.createElement("tr");
            trow.className = "product-row";

            let statusHtml;
            if (item.available === true){
                statusHtml = '<span class="status-in-stock">In Stock</span>';
            } else {
                statusHtml = '<span class="status-out-of-stock">Out of Stock</span>';
            }
            trow.innerHTML = `
                <td>
                <div class = "product-info">
                    <img src="${item.image}" alt="${item.Name}" />
                    <p>${item.Name}</p>
                </div>
                </td>
                <td class = "product-status">
                    ${statusHtml}
                </td>
                <td class = "product-id">
                    ${Math.floor(100000 + Math.random() * 900000)}
                </td>
                <td class = "product-price">
                    ${item.price.toLocaleString()}
                </td>

                <td>

                <div class = "product-actions">

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
            `;
            tbody.appendChild(trow);
        });

          // Table delete/Edit Functionality

          const deleteMsg = document.querySelector(".delete-message");
          const editMsg = document.querySelector(".edit-message");
            let deleteRow;  

         tbody.addEventListener("click", (e) =>{
            
            const deleteBtn = e.target.closest(".delete-btn");
            const editBtn = e.target.closest(".edit-btn");

            if(deleteBtn){

                // Show popup message
                message.classList.remove("hidden");
                deleteMsg.classList.remove("hidden");
                editMsg.classList.add("hidden");

                // Get the row to be deleted and store it in global variable (deleteRow) for later use
                deleteRow = deleteBtn.closest("tr");

            };

           if(editBtn){

                // Show popup message
                message.classList.remove("hidden");
                editMsg.classList.remove("hidden");
                deleteMsg.classList.add("hidden");

            }

        });


                 // Confirm delete action
                const confirmBtn = document.getElementById("confirm-btn");
                confirmBtn.addEventListener("click", () =>{
                    if(deleteRow){
                        deleteRow.remove();
                        deleteRow = null;  // Clear the reference after deletion
                        deleteMsg.classList.add("hidden");  
                        message.classList.add("hidden");
                    }
                });

                // close the message box
                const closeBtn = document.getElementById("close-btn");
                closeBtn.addEventListener("click", () =>{
                    message.classList.add("hidden");
                    deleteMsg.classList.add("hidden");
                });


    } catch (error) {
        console.error(error);
        tbody.innerHTML = "<tr><td colspan='5'>Sorry an error occurred while fetching the data.</td></tr>";
    }

}

adminTable();

