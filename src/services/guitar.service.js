import { 
  getGuitarById,
  getAllGuitars, 
  saveGuitar, 
  updateGuitar,
  deleteGuitar
} from '../models/guitar.model.js';

const getGuitar = async (id) => await getGuitarById(id);

const getAll = async () => await getAllGuitars();

const createGuitar = async (guitar) => await saveGuitar(guitar);

const updateGuitarById = async (id, guitar) => await updateGuitar(id, guitar);

const deleteGuitarById = async (id) => await deleteGuitar(id);





export default { getAll, createGuitar, getGuitar, updateGuitarById, deleteGuitarById };
