const express = require('express');
const {Pool} = require('pg');
let ejs = require('ejs');
const path = require('path');
const app = express();
const port = 3000;
require('dotenv').config()
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})
updateFeaturedProducts();
async function updateFeaturedProducts() {
    try{
        await pool.query('update products set isfeatured = false; ')
        await pool.query('update products set isfeatured = true where id IN (select id from products order by random() limit 3);')
        console.log('Zaktualizowano promowane produkty');
    } catch(err){
        console.error(`Błąd: ${err}`)
    }
}
setInterval(() => {
    updateFeaturedProducts().catch(err=>console.error(`Bład przy akutalizacji slidera: ${err}`))
}, 86400000);

const reviews =[
    {author: 'Krzysztof K.', text: 'Świetne jakościowo produkty w przystępnych cenach! Polecam, szczególnie wilcze majty!'},
    {author: 'Jan W.', text: 'Ekspresowe dostawy, bardzo się cieszę że dostarczają produkty nawet tam gdzie inni boją się zapuszczać'},
    {author: 'Zachariasz M.', text: 'Najlepszy bazar w okolicy, zawsze tu wracam.'},
]

app.get('/', async(req,res)=>{
    try{
    const FeaturedProducts = await pool.query(
        `select title,price,image from products where isfeatured=true`
    )
    res.render('index',{
        title: 'Bazar u Zdzicha',
        products: FeaturedProducts.rows,
        reviews
    })
    } catch (err) {
    console.error('Błąd:', err);
    res.status(500).send('Błąd serwera');
  }
})

app.get('/products', async(req,res)=>{
    const products = await pool.query(
        `select id,title,price,category,image from products`
    )
    res.render('products',{
        title: 'Bazar u Zdzicha',
        products: products.rows,
    })
})

app.get('/products/:productId', async(req,res)=>{
    const {productId} = req.params
    const product = await pool.query(
        `select * from products where id=$1`,[productId]
    )
    res.render('productDetailPage', { title: 'Bazar u Zdzicha',product: product.rows[0]})
})

app.get('/koszyk', async(req,res)=>{
    res.render('shoppingcart',{title: 'Bazar u Zdzicha'})
})

app.listen(port)