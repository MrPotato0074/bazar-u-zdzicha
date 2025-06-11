  const cartItemsContainer = document.querySelector('.cart-items-container');
  const cartPaymentContainer = document.querySelector('.cart-payment-conatiner');

const cartData = JSON.parse(localStorage.getItem('cart')) || []; 

const cart = cartData.filter(item=>item.id !== null && item.title && item.price != null)

function saveCart(){
    localStorage.setItem('cart',JSON.stringify(cart))
}

function renderCart(){
    cartItemsContainer.innerHTML = ``
    if(cart.length===0){
         cartItemsContainer.innerHTML = `<h2>Koszyk jest pusty</h2>`
         return
    }
    let total=0
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-cart');

        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="item-details">
                <h3>${item.title}</h3>
                <p class="price">${item.price.toFixed(2)} zł</p>
            </div>
            <div class="quantity-container">
                <i class="fa-solid fa-minus" data-id="${item.id}"></i>
                <p class="quantity">${item.quantity}</p>
                <i class="fa-solid fa-plus" data-id="${item.id}"></i>
            </div>
        `;

        cartItemsContainer.appendChild(itemDiv);
        console.log(item.title);
        
    });

    cartPaymentContainer.innerHTML = `
        <h2>Do zapłaty: ${total.toFixed(2)} zł</h2>
    `;

    document.querySelectorAll('.fa-plus').forEach(elem=>{
        elem.addEventListener("click",()=>{
            const id = elem.dataset.id
            const item = cart.find(prod=>prod.id===id)
          
            item.quantity += 1;
            saveCart();
            renderCart();
            updateCartCount()
        })
    })

    document.querySelectorAll('.fa-minus').forEach(elem=>{
        elem.addEventListener("click",()=>{
            const id = elem.dataset.id
            const item = cart.find(prod=>prod.id===id)
          if(item.quantity>1){
            item.quantity-=1
          } else{
            const index = cart.findIndex(product=>product.id===id)
            cart.splice(index,1)
            updateCartCount()
          }
            saveCart();
            renderCart();
            updateCartCount()
        })
    })
}

function updateCartCount(){
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const countNum = cart.reduce((total,items)=>total+items.quantity, 0)
    const cartCount =  document.getElementById('cart-count')
    cartCount.innerText = countNum
}

renderCart()
updateCartCount()