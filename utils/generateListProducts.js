function generateListProducts(arrayProducts){
    let listProductsData = '';
    let objConfig = [... new Set(arrayProducts.map((obj)=>{return obj.name}))]
    
    if(objConfig.length == 1){
        listProductsData = objConfig[0]
    }else if(objConfig.length == 2){
        listProductsData = objConfig[0] + " y " + objConfig[1] 
    }else{
        objConfig.forEach((product) => {
            if(product == objConfig[objConfig.length - 2]){
                listProductsData = listProductsData + product + " y "
            }else if(product == objConfig[objConfig.length - 1]){
                listProductsData = listProductsData + product
            }
            else{
                listProductsData = listProductsData + product + ", "
            }
        });
    }

    return listProductsData.toLowerCase()
}

export default generateListProducts