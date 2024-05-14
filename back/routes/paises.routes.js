import { Router } from "express";
import {crearViajes,listarViajes,cargarPaises,getSuggestions} from '../controllers/paises.controllers.js'


const router = Router()

router.post('/crearViajes', crearViajes)
router.get('/cargarPaises', cargarPaises)
router.get('/listarViajes', listarViajes)
router.get('/getSuggestions', getSuggestions);



export default router;