import fs from 'fs'

//read json file with info products
const data = fs.readFileSync('models/dbProducts.json', 'utf8'); // Leer el archivo JSON

//parse info to Obj JS
const dbProducts = JSON.parse(data); 



//function that convert simple object to object ready for PDF

async function convertObjectBeforePdf(simpleObject){
    let workObj = {...simpleObject};
         
    const dataGet = await fetch("https://mx.dolarapi.com/v1/cotizaciones/usd")
    const dataJson = await dataGet.json()

    workObj.products.forEach((product) => {
        product.price = dbProducts[product.name].filter((dbProduct)=>{return dbProduct.model == product.model})[0].price
        product.description = dbProducts[product.name].filter((dbProduct)=>{return dbProduct.model == product.model})[0].description
        product.unidades = dbProducts[product.name].filter((dbProduct)=>{return dbProduct.model == product.model})[0].unidades
    });

    
    return workObj
}
export default convertObjectBeforePdf