function updateCartCount(){
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const countNum = cart.reduce((total,items)=>total+items.quantity, 0)
    const cartCount =  document.getElementById('cart-count')
    cartCount.innerText = countNum
}
updateCartCount()

const buttons = document.querySelectorAll('.add-to-cart-btn')
buttons.forEach(btn=>{
    btn.addEventListener("click",()=>{
        const id = btn.dataset.id;
        const title = btn.dataset.title;
        const price = parseFloat(btn.dataset.price);
        const image = btn.dataset.image;

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const exist = cart.find(item => item.id===id)
        exist ? exist.quantity +=1 : cart.push({id,title,price,image,quantity: 1})

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount()
        console.log('added');
        
    })
})