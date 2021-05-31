import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import {db, firebase} from "./firebase"
import "bootstrap/dist/css/bootstrap.min.css"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
/*
async function readAllUseres(){

  try{
    //Long way:
    //const collectionRef = db.collection("students_test");
    //const getPromise = collectionRef.get();
    //const snapshot = await getPromise;

    //Short way
    const snapshot = await db.collection("students_test").get()

    console.log(`Found ${snapshot.size} student`);

    const docs = snapshot.docs;
    docs.forEach(docSnapchot => {
      console.log(docSnapchot.id, docSnapchot.data());
    });

  }catch(err){
    console.error(err);
  }

}

readAllUseres();

async function readOneUser(id){
   try {
     const snapshot = await db.collection("students_test").doc(id).get();
     if(!snapshot.exists){
       console.log(`doc not found with id: no students with id${id}`);
     }else{
      console.log(`Sucsess student found!`);
      console.log(snapshot.id);
      console.log(snapshot.data());
     }
   } catch (err) {
      console.error(err)
   }
}

readOneUser("cncdunc");*/