import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Country from '../models/paises.model.js';
import crear from '../models/pais.model.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const crearViajes = async(req,res) =>{
    try{
        const {origen,destino,dia} = req.body;
        const newPais = new crear({
            origen,
            destino,
            dia
        })
        const guardarViaje = await newPais.save()
        res.json(guardarViaje)
    } catch (error){
        console.log('error al guardar el viaje', error)
        res.status(501).json({ Message :'error al guardar el viaje'})
    }
}
export const listarViajes = async(req,res) =>{
    
    try {
        const listar= await crear.find();

        res.status(200).json(listar)
    } catch (error) {
        console.error('error al listar')
        res.status(500).json({message:'ha ocurrido un error'})
    }
    
}
export const cargarPaises = async (req,res)=>{
    
    try {
        const jsonFilePath = path.resolve(__dirname, '../data/Countries.json');
        console.log('hola',jsonFilePath)

        
        const contenidoBuffer = await fs.readFile(jsonFilePath,'utf-8');
        const contenido = contenidoBuffer.toString();
        console.log('bye',contenido)
        
        const data = JSON.parse(contenido)
        
        await Country.insertMany(data.countries);
        
        res.status(200).json({message: "Paises incertado correctamente"})
        
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        res.status(500).json({ error: "Error al cargar los datos" });
    }
}
// Suponiendo que esta es tu función getSuggestionsFromDatabase
export const getSuggestionsFromDatabase = async (query) => {
    try {
        // Lógica para obtener sugerencias de la base de datos basadas en el query param 'query'
    // Esta es solo una implementación de ejemplo, debes adaptarla a tu lógica
    
        const suggestions = await Country.find({ $text: { $search: query } });
        return suggestions;    
    } catch (error) {
        console.log(error)
    }
  };
  
export const getSuggestions = async (req, res) => {
    try {
        const query = req.query.query;
        const countries = await Country.find({ name: { $regex: query, $options: 'i' } });
        res.status(200).json(countries);
      } catch (error) {
        console.error('Error al obtener las sugerencias:', error);
        res.status(500).json({ error: 'Error al obtener las sugerencias' });
      }
    };
  


