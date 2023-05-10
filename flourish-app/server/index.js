import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import crypto from 'crypto';
import fs from 'fs';
import { setDoc, doc, getDoc, collection, updateDoc } from "@firebase/firestore"
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const algorithm = 'aes-256-cbc';

const keyFile = './key.bin';
const masterKey = 'sampletext';
let key, iv;

if (fs.existsSync(keyFile)) {
    const data = fs.readFileSync(keyFile);
    key = Uint8Array.prototype.slice.call(data, 0, 32); 
    iv = Uint8Array.prototype.slice.call(data, 32, 48); 
} else {
    key = crypto.randomBytes(32);
    iv = crypto.randomBytes(16);
    const data = Buffer.concat([key, iv]);
    console.log(data.length)
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    const encryptedData = Buffer.concat([cipher.update(data), cipher.final()]);
    fs.writeFileSync(keyFile, encryptedData);
}

const app = express();

const PORT = 4000;

function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

function decrypt(text) {
    text = {iv: iv, encryptedData: text};
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

const firebaseConfig = {
    apiKey: "AIzaSyBc6fQphfkhuyBB60S5_fC20ZLJa1igbGw",
    authDomain: "flourish-app-c5eb1.firebaseapp.com",
    projectId: "flourish-app-c5eb1",
    storageBucket: "flourish-app-c5eb1.appspot.com",
    messagingSenderId: "932209552062",
    appId: "1:932209552062:web:71530d0f3c699c07920cef",
    measurementId: "G-E2H074R2H8"
  };
  
  // Initialize Firebase
const app_fb = initializeApp(firebaseConfig);
const firestore = getFirestore(app_fb);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const makeUser = async(info) => {
    if(info.username.length == 0){
        return {code: 422, error: 1, subtext: "Username cannot be empty"};
    }
    else if(info.password.length == 0){
        return {code: 422, error: 2, subtext: "Password cannot be empty"};
    }
    else if(info.firstname.length == 0){
        return {code: 422, error: 5, subtext: "Name cannot be empty"};
    }
    else if(info.lastname.length == 0){
        return {code: 422, error: 6, subtext: "Surname cannot be empty"};
    }

    const ref = collection(firestore, "flourish_auth");
    const docRef = doc(firestore, "flourish_auth", info.username);
    const docRefSnap = await getDoc(docRef);

    if(docRefSnap.exists()){
        return {code: 401, error: 0, subtext: "Username already exists"};
    }
    else{
        if(info.password.length < 6){
            return {code: 422, error: 3, subtext: "Password too short (min. 6 chars)"};
        }
        else if(info.password !== info.confpassword){
            return {code: 422, error: 4, subtext: "Passwords don't match"};
        }
        else{
            try{
                let userData = {
                    username: encrypt(info.username), 
                    password: encrypt(info.password),
                    firstname: encrypt(info.firstname),
                    lastname: encrypt(info.lastname),
                    goals: [],
                    goalcount: 0,
                    subgoalcount: 0};

                console.log(userData);

                setDoc(doc(ref, info.username), userData)
                return {code: 200, error: -1, subtext: "Success"}
            } catch(err) {
                return {code: 400, error: 7, subtext: "Unknown error: " + err}
            }
        }
    }
}

const authUser = async(user) => {
    if(user.username.length == 0){
        return {code:422, error: 0, info:null, subtext: "Username cannot be empty"};
    }
    else if(user.password.length == 0){
        return {code:422, error: 1, info:null, subtext: "Password cannot be empty"};
    }

    const ref = doc(firestore, "flourish_auth", user.username);
    const refSnap = await getDoc(ref);

    if(refSnap.exists()){
        let data = refSnap.data();

        console.log(data.password);
        console.log(decrypt(data.password))

        if(user.password !== decrypt(data.password)){
            return {code:401, error: 3, info:null, subtext: "Password is incorrect"};
        }
        return {code:200, error: -1, info:{
            username:decrypt(data.username),
            password:decrypt(data.password),
            firstname:decrypt(data.firstname),
            lastname:decrypt(data.lastname),
            goals:data.goals,
            goalcount:data.goalcount,
            subgoalcount:data.subgoalcount
        }};
    }
    else{
        return {code:401, error: 2, info:null, subtext: "Username not found"};
    }
}

const setUser = async(info) => {
    const ref = doc(firestore, "flourish_auth", info.username);
    const refSnap = await getDoc(ref);

    await updateDoc(ref, {username:encrypt(info.username), password:encrypt(info.password), 
        firstname:encrypt(info.firstname), lastname:encrypt(info.lastname), goals:info.goals, 
        goalcount:info.goalcount, subgoalcount:info.subgoalcount});
    return {code:200, error:-1, 
        data:{...refSnap.data(), username:decrypt(refSnap.data().username), 
            password:decrypt(refSnap.data().password),
            firstname:decrypt(refSnap.data().firstname),
            lastname:decrypt(refSnap.data().lastname)}}
}

//input: username, password (object) -> deepstringified login output (code, error, info)
app.post('/auth', (req, res) => {
    authUser(req.body).then((info) => {
        res.send(info);
    });
})

//input: username, password, confirmpassword firstname, lastname (object) -> signup output (code, error, info)
app.post('/signup', (req, res) => {
    makeUser(req.body).then((info) => {
        res.send(info);
    });
})

//input: user object (setter) -> deep stringified data from firebase (not relevant)
app.post('/set', (req, res) => {
    setUser(req.body).then((info) => {
        res.send(info.data)
    })
})

app.listen(4000, async () => {
    console.log(`server up on port ${PORT}`);
});