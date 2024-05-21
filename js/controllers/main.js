import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard(name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML =
        `<div class="card-container-img">
            <img src="${image}" alt="${name}">
        </div>

        <div class="card-container-info">
            <p>${name}</p>
            <div class="card-container-value">
             <p>$ ${price}</p>
            <button class="delete-button" data-id="${id}">
            <img src="img/delete.png" alt="eliminar">
            </button>
            </div>
        </div>`;

     productContainer.appendChild(card);
    return card;
}

//apareceran los productos renderizados
const render = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        productContainer.innerHTML = '';
        
        listProducts.forEach(product => {
            productContainer.appendChild(createCard(
                product.name,
                product.price,
                product.image,
                product.id
            )
          )
        });

    } catch (error) {
        console.log(error);
    }
};

//captura los elementos del formulario
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProducts.createProducts(name, price, image)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

//boton eliminar
productContainer.addEventListener("click", async (event) => {
    event.preventDefault();
    
    const removeButton = event.target.closest(".delete-button");
    if (removeButton) {
        const itemId = removeButton.dataset.id;
        servicesProducts.deleteProduct(itemId)
            .then(() => {
                console.log('Producto eliminado con éxito');
                render(); 
            })
            .catch((err) => console.log(err));
    }
});

// Limpiar todos los campos del formulario
const clearButton = document.querySelector(".btn-clear");
clearButton.addEventListener("click", () => {
    form.reset();  
});

render();