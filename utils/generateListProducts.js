function generateListProducts(objConfig){
    let listProductsData = '';
    if(objConfig.length == 1){
        listProductsData = objConfig[0].name
    }else if(objConfig.length == 2){
        listProductsData = objConfig[0].name + " y " + objConfig[1].name 
    }else{
        objConfig.forEach((product) => {
            if(product == objConfig[objConfig.length - 2]){
                listProductsData = listProductsData + product.name + " y "
            }else if(product == objConfig[objConfig.length - 1]){
                listProductsData = listProductsData + product.name
            }
            else{
                listProductsData = listProductsData + product.name + ", "
            }
        });
    }

    return listProductsData.toLowerCase()
}

export default generateListProducts