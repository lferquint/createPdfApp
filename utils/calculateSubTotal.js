function calculateSubTotal(objProducts){
        let subtotal = 0
        objProducts.forEach(element => {
            subtotal = subtotal + (element.price * element.cantidad) 
        });
        return subtotal
}
export default calculateSubTotal