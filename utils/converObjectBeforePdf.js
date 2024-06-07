import fs from 'fs'

//read json file with info products
const data = fs.readFileSync('models/dbProducts.json', 'utf8'); // Leer el archivo JSON

//parse info to Obj JS
const dbProducts = JSON.parse(data); 



//function that convert simple object to object ready for PDF

function convertObjectBeforePdf(simpleObject){
    let workObj = simpleObject;
    workObj.products.forEach((product) => {
        product.price = dbProducts.pisos.filter((dbProduct)=>{return dbProduct.model == product.model})[0].price
        product.description = dbProducts.pisos.filter((dbProduct)=>{return dbProduct.model == product.model})[0].description
        product.unidades = dbProducts.pisos.filter((dbProduct)=>{return dbProduct.model == product.model})[0].unidades
    });
    
    return simpleObject
}
export default convertObjectBeforePdf