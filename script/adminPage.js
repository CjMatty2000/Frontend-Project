
async function adminTable() {
    try {
        const tbody = document.getElementById("product-table-body");
        const response = await fetch("../data/app.json");
        const data = await response.json();
        tbody.innerHTML = ""
    
        data.Menu.forEach(item => {
            const trow = document.createElement("tr");
            trow.className = "product-row";

            let statusHtml;
            if (item.available === true){
                statusHtml = '<span class="status in-stock">In Stock</span>';
            } else {
                statusHtml = '<span class="status out-of-stock">Out of Stock</span>';
            }
            trow.innerHTML = 
                <td class = "product-info">
                    <img src="${item.image}" alt="${item.Name}" />
                    <p>${item.Name}</p>
                </td>
                <td class = "product-status">
                    ${statusHtml}
                </td>
                <td class = "product-id">
                    ${Math.floor(Math.random() * 100) + 1}
                </td>
                <td class = "product-price">
                    ${item.price.toLocaleString()}
                </td>
                <td class = "product-actions">
                    <button class="edit-btn" data-id="${item.id}">Edit</button>
                    <button class="delete-btn" data-id="${item.id}">Delete</button>
                </td>
            ;
            tbody.appendChild(trow);
        });

    } catch (error) {
        console.error(error);
        tbody.innerHTML = "<tr><td colspan='5'>Sorry an error occurred while fetching the data.</td></tr>";
    }

}

adminTable();

