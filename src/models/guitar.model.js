import  { db } from '../config/db.js';
import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    addDoc, 
    updateDoc, 
    deleteDoc
} from 'firebase/firestore';

const guitarCollection = collection(db, 'guitars');

/////////////////////////////////////////////////

export const getGuitarById = async (id) => {
    try {
        const guitarById = doc(guitarCollection, id);
        const guitars = await getDoc(guitarById);
        if (!guitars.exists()) {
            throw new Error('Guitarra no encontrada');
        }
        return { id: guitars.id, ...guitars.data() };
    } catch (error) {
        throw new Error('Error al obtener guitarra por ID', error.message);
    }
};

/////////////////////////////////////////////////

export const getAllGuitars = async () =>{
    try {
        const guitarsList = await getDocs(guitarCollection);
        const guitars = [];
        guitarsList.forEach((doc) => guitars.push({ id: doc.id, ...doc.data()}));
        return guitars
    } catch (error) {
        throw new Error('Error', error.message);
    }
};

//////////////////////////////////////////////////

export const saveGuitar = async (guitar) => {
    try {
        const newGuitar = await addDoc(guitarCollection, guitar);
        return newGuitar;
    } catch (error) {
        throw new Error('Error', error.message);
    }
};

////////////////////////////////////////////////

export const updateGuitar = async (id, guitar) => {
    try {
        const guitarModify = doc(guitarCollection, id);
        const guitarId = await getDoc(guitarModify);

        if (!guitarId.exists()) {
            throw new Error('Guitarra no encontrada');
        }

        await updateDoc(guitarModify, guitar);
        return { id, ...guitar };
    } catch (error) {
        throw new Error('Error al actualizar guitarra', error.message);
    }
};

////////////////////////////////////////////////

export const deleteGuitar = async (id) => {
    try {
        const guitarSearch = doc(guitarCollection, id);
        const guitarId = await getDoc(guitarSearch);

        if (!guitarId.exists()) {
            throw new Error('Guitarra no encontrada');
        }

        await deleteDoc(guitarSearch);
        return { message: 'Guitarra eliminada correctamente' };
    } catch (error) {
        throw new Error('Error al eliminar guitarra', error.message);
    }
};

