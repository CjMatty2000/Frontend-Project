
async function adminTable() {
    try {
        const tbody = document.getElementById("product-table-body");
         const message = document.getElementById("message")
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

       /*  tbody.addEventListener("click", (e) =>{
            const Edit = e.target.className("edit-btn");
            const Delete = e.target.className("delete-btn");

            if(Delete){
                const row = e.target.closest("tr");
                row.remove();
            }

        }); */

    } catch (error) {
        console.error(error);
        tbody.innerHTML = "<tr><td colspan='5'>Sorry an error occurred while fetching the data.</td></tr>";
    }

}

adminTable();

