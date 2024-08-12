//Imports
import express from 'express'; 
import makePdf from '../controllers/makePdf.js';
import convertObjectBeforePdf from '../utils/converObjectBeforePdf.js';
const router = express.Router();

//route to make PDF
router.post('/hello', async (req, res)=>{
    // Pasando el body del la peticion a una funcion que transforma la data
    const objToPdf = await convertObjectBeforePdf(req.body);
    //Pasando un objeto de tipo PDF


    res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=cotizacion.pdf"    
    })
    const doc = makePdf(objToPdf, res);

    
});

export default router;