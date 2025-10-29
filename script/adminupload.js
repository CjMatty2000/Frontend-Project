

async function saveProduct() {
    try {
    const form = document.getElementById("upload-form");
    const imageLabel = document.getElementById("image-label");
    const imageUploadIcon = document.getElementById("image-upload-icon");
    const imagePreview = document.getElementById("image-preview");
    const imageOptionsContainer = document.querySelector(".image-options-container");
    const nameInput = document.getElementById("product-name");
    const statusInput = document.getElementById("status");
    const idInput = document.getElementById("product-id");
    const priceInput = document.getElementById("product-price");
    const errorMessage = document.getElementById("error-message");
    const successMessage = document.querySelector(".successful-message-container");
    const innerBox = successMessage.querySelector(".success-message");

     // Show image options on click

   imageLabel.addEventListener("click", function (e) {
  e.preventDefault();
  imageOptionsContainer.classList.add("show");
});


     // Close popup when clicking outside
    imageOptionsContainer.addEventListener("click", (e) => {
      if (e.target === imageOptionsContainer) {
        imageOptionsContainer.classList.remove("show");
      }
    });

     // Capture from camera
        const captureInput = document.getElementById("image-capture-input");
        const galleryInput = document.getElementById("image-gallery-input");

        captureInput.addEventListener("change", function (e){
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    imagePreview.src = e.target.result;
                    imagePreview.classList.remove("hidden");
                    imageUploadIcon.style.display = "none";
                   imageOptionsContainer.classList.remove("show");
                }
                reader.readAsDataURL(file);
            }
        });

        // Select from gallery
        galleryInput.addEventListener("change", function (e){
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    imagePreview.src = e.target.result;
                    imagePreview.classList.remove("hidden");    
                    imageUploadIcon.style.display = "none";
                     imageOptionsContainer.classList.remove("show");
                }
                reader.readAsDataURL(file);
            }
        });

        
            // Error message functionality
            function showError() {
            errorMessage.classList.add("show");
            errorMessage.classList.remove("hide");

            setTimeout(() => {
                errorMessage.classList.add("hide");
                errorMessage.classList.remove("show");
            }, 3000);
            }

        // local storage save on submit

        function saveToLocalStorage() {
            const productData = {
                name: nameInput.value.trim(),
                status: statusInput.value,
                id: idInput.value.trim(),
                price: priceInput.value.trim(),
                image: imagePreview.src || "", 
            };

            const existingProduct = JSON.parse(localStorage.getItem("productData")) || [];
                existingProduct.push(productData);
                localStorage.setItem("productData", JSON.stringify(existingProduct));
        };

        function itemsFromLocalStorage() {
            const storedData = localStorage.getItem("productData");
            if (storedData) {
                const productData = JSON.parse(storedData);
                nameInput.value = productData.name || "";
                statusInput.value = productData.status || "";
                idInput.value = productData.id || "";
                priceInput.value = productData.price || "";
                if (productData.image) {
                    imagePreview.src = productData.image;
                    imagePreview.classList.remove("hidden");
                    imageUploadIcon.style.display = "none";
                }
            }
        };

    form.addEventListener("submit", function (e) {
        e.preventDefault();

            const name = nameInput.value.trim();
            const status = statusInput.value;
            const productId = idInput.value.trim();
            const price = priceInput.value.trim();
            const imageSrc = imagePreview.src;
        
            // My validation
            if (!name || !status || !productId || !price || !imagePreview.src || imagePreview.classList.contains("hidden")){
                showError() 
            }else{
                saveToLocalStorage();
                showSuccessMessage();
            }

    }); 

    function showSuccessMessage() {
  successMessage.classList.add("show");
  innerBox.classList.add("show");
    setTimeout(() => {
    innerBox.classList.remove("show");
    successMessage.classList.remove("show");

    // now go to the admin table page
    window.location.href = "adminPage.html";
    }, 2000);
}

  itemsFromLocalStorage()

  
    } catch (error) {

        alert("Sorry an error occured while fetching data")
       
    }

}

saveProduct();

