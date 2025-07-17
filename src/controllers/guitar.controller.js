// controller
import guitarService from '../services/guitar.service.js';

const getGuitarById = async (req, res) => {
    try {
        const { id } = req.params;
        const guitar = await guitarService.getGuitar(id);
        res.status(200).json({ message: 'Guitarra obtenida', payload: guitar });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


const getGuitars = async (req, res) => {
    try {
        const guitars = await guitarService.getAll();
        res.status(200).json({message:'Guitarras obtenidas', payload: guitars});

    } catch (error) {
       res.status(500).json({message: 'Error interno del servidor', error: error.message}); 
    }
};

const createGuitar = async (req, res) => {
  try {
    const { marca, modelo, precio, stock } = req.body;
    const newGuitar = {
      marca,
      modelo,
      precio: +precio,
      stock: +stock || 0
    };

    await guitarService.createGuitar(newGuitar);
    res.status(200).json({ message: 'Lista de Guitarras', payload: newGuitar });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error interno del servidor', error: error.message });
  }
};


const updateGuitar = async (req, res) => {
    try {
        const { id } = req.params;
        const guitarData = req.body;
        const updatedGuitar = await guitarService.updateGuitarById(id, guitarData);
        res.status(200).json({ message: 'Guitarra actualizada', payload: updatedGuitar });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteGuitar = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await guitarService.deleteGuitarById(id);
        res.status(200).json({ message: result.message });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export default { getGuitarById, getGuitars, createGuitar, updateGuitar, deleteGuitar };






