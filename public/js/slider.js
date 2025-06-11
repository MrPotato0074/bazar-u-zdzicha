

document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    });
})

function updateCartCount(){
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const countNum = cart.reduce((total,items)=>total+items.quantity, 0)
    const cartCount =  document.getElementById('cart-count')
    cartCount.innerText = countNum
}

updateCartCount()