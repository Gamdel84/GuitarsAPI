import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { envs } from './envs.js';

const {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
} = envs.FIREBASE;
const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };



