let firebase = require('firebase')
const firebaseuser = {
    LOGIN: process.env.FIREBASE_LOGIN,
    PASSWORD: process.env.FIREBASE_PASSWORD
}

const config = {
    apiKey: "AIzaSyCrB651un0PpVPfbdA7U204pQrsQhfkBoI",
    authDomain: "roboebantyai.firebaseapp.com",
    databaseURL: "https://roboebantyai.firebaseio.com",
    projectId: "roboebantyai",
    storageBucket: "roboebantyai.appspot.com",
    messagingSenderId: "465882212183"
}

class DataBase {
    constructor() {
        firebase.initializeApp(config);
        firebase.auth().signInWithEmailAndPassword(firebaseuser.LOGIN, firebaseuser.PASSWORD)
        this.db = firebase.database() // For JSONs
        this.storage = firebase.storage() // For files (images)
    }

    set_work_date(work_date) {
        this.db.ref('schedule/').set({ last_work_date: work_date })
    }

    get_work_date() {
        return this.db.ref('schedule/last_work_date').once('value').then(function (snapshot) {
            if (!snapshot.val()) {
                return 'NO_DATE'
            } else {
                return snapshot.val()
            }
        });
    }

    clear() {
        this.db.ref('schedule/').set(undefined)
    }

    // BETA. Trying to upload atleast something.
    uploadImage(imageBlob) {
        const storageRef = this.storage.ref()
        const trashRef = storageRef.child('/everything/');
        return trashRef.child('OLOLFILENAME.jpg').put(imageBlob)
            .then(snapshot => {
                console.log('Uploaded a blob or file!');
                return snapshot
            });
    }
}

// singleton
let database = new DataBase()
module.exports.DB = database