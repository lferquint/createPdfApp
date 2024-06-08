import PdfDocument from 'pdfkit-table';
import generateListProducts from "../utils/generateListProducts.js";
import doDate from '../utils/doDate.js';
import formateadorMXN from '../utils/formateadorMXN.js';
import {calculateSubTotal, calculateIVA, calculateTotal} from '../utils/calculateTotales.js';

async function makePdf(objConfig, res){
    const doc = new PdfDocument();

    const topPosition = 40;

    console.log(objConfig)
    doc.fontSize(13).font('Courier-Bold').fillColor('gray').text("Division", 260, 45,  {
        paragraphGap: 5,
        width: 110,
        align: 'right'
    });
    doc.text("Hospitalaria", {
        paragraphGap: 5,
        width: 110,
        align: 'right'
    });
    doc.rect(380, topPosition, 0.5, 80)
        .strokeColor('gray')
        .stroke();

    doc.rect(70, topPosition + 90, 470, 0.5)
        .strokeColor('gray')
        .stroke();
    
    doc.image('./img/image.png' , 390, topPosition + 25 ,{
        // fit: [100, 100],
        width: 150,

    });
    doc.fontSize(6).fillColor('black').text(
        "San Francisco No. 9, Col. San Jerónimo Aculco, D.F.",  
        70,
        topPosition + 60,
        {
            paragraphGap: 10
        }
    );
    doc.fontSize(6).text(
        `Tels. (55) 5631-2039 / Email: vrintecsistemasdesalud@yahoo.com.mx`,  
        70,
        topPosition + 70,
        {
            paragraphGap: 10
        }
    );
    doc.fontSize(10).moveDown().moveDown().font('Helvetica-Bold').text(
        `${objConfig.clientData.company}`,  
        {
        }
    );
    doc.text(
        `ATN. ${objConfig.clientData.name}`, 
        {
        }
    );
    doc.text(
        `TEL. ${objConfig.clientData.tel}`, 
        {
        }
    );
    doc.font('Helvetica').text( `${doDate(new Date())}`, {
        align: 'right'
    })
    
    doc.moveDown().moveDown().font('Helvetica').text(
        `Por medio de la presente ponemos a su atentea consideracion la cotizacion de ${generateListProducts(objConfig.products)}.`, 
        {
        }
    );
    doc.moveDown().text(
        `Obra: ${objConfig.clientData.obra}`
    );
    // doc.image('./img/image.jpeg',{
    //     // fit: [100, 150],
    //     width: 150,
    // }); 


    // // Tener cuidado con esto (inicio) --------------------------------------------------------------------
    let granArray =[];
    for(let i = 0; i<objConfig.products.length; i++){
        let array =[];
        array.push(objConfig.products[i].name, objConfig.products[i].description, objConfig.products[i].cantidad, objConfig.products[i].unidades, `${ formateadorMXN.format(objConfig.products[i].price)}`, `${ formateadorMXN.format(objConfig.products[i].cantidad * objConfig.products[i].price)}`)
        granArray.push(array);
    }
    let table = {
        headers: [ "Producto", "Descripcion", "Cantidad", 'Unidad', 'Precio unitario', 'Importe' ],
        rows: granArray,
        options: {
            prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                doc.font("Helvetica").fontSize(9).text();
            },
        }
    };

    //Aqui hace falta un await
    await doc.moveDown().moveDown().moveDown().table(table, { 
        width: 475,
        columnsSize: [79.16, 120.84, 58.32, 58.32, 79.16, 79.16 ]
    })
    // // Tener cuidado con esto (final) -----------------------------------------------------------------------

    doc.font('Helvetica-Bold').text(`Subtotal ${formateadorMXN.format(calculateSubTotal(objConfig.products))}`, {
        align: 'right',
        lineGap: 5
    })
    doc.text(`IVA ${formateadorMXN.format(calculateIVA(calculateSubTotal(objConfig.products)))}`, {
        align: 'right',
        lineGap: 5

    })
    doc.text(`TOTAL ${formateadorMXN.format(calculateTotal(calculateSubTotal(objConfig.products)))}`, {
        align: 'right'
    })
    doc.text('TIEMPO DE ENTREGA:')
    doc.font('Helvetica').text(`${objConfig.otherData.tiempoDeEntrega}`)

    doc.moveDown().moveDown().moveDown().moveDown().moveDown();
    doc.fillColor('black').fontSize(10).font('Helvetica-Bold').text('CONDICIONES DE VENTA:');
    doc.text('Nuestros precios son más IVA.');
    doc.text('Tiempo de entrega; el especificado.');
    doc.text('Condiciones de pago: 100% anticipado.');
    doc.text('El tiempo de entrega se considera a partir de recibir en firme el deposito del anticipo y autorizacion del pedido.', {
        width: '300'
    });
    doc.text('Precios sujetos a cambio sin previo aviso.');
    doc.text('Envios foraneos corren a cuenta y riego del cliente.');

    doc.moveDown().moveDown().moveDown().moveDown().text('Atentamente:', {
        align: 'center'
    });
    doc.moveDown().font('Helvetica').text('Elias Moreno Garay', {
        align: 'center'
    });
    doc.pipe(res);
    doc.end();    
    return doc
}

export default makePdf