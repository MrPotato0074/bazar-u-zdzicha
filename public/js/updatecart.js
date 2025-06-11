function updateCartCount(){
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const countNum = cart.reduce((total,items)=>total+items.quantity, 0)
    const cartCount =  document.getElementById('cart-count')
    cartCount.innerText = countNum
}

module.exports=updateCartCount