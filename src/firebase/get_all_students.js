import React from 'react';
import {useEffect, useState} from "react"
import { db } from "../firebase";

//internal student component 
function Student({ data }){
    return (
        <div>
            <p>{data.age}</p>
            <p>{data.name}</p>
        </div>
    );
}

function GetAllStudents(){

    //inisialaze loading state with true enstead of false
    const [queryState, setQuerystate] = useState({
        isLoading: true,
        errorMessage: "",
        docSnapchots: null,
    });

    useEffect(() => {
        async function getAllUsers(){
            try{
                //Short way
                setQuerystate({isLoading: true, errorMessage: "", docSnapchots:null});

                const snapshot = await db.collection("students_test").get()
                const docSnapchots = snapshot.docs;

                setQuerystate({isLoading: false, errorMessage: "", docSnapchots});

                console.log(docSnapchots) ;               
            
              }catch(err){
                setQuerystate({
                    isLoading: false,
                    errorMessage: "Could not connect to database",
                    docSnapchots:null
                    });
                console.error(err);
              }
        }
        
        getAllUsers();
    }, []);

    //distructure our state variables to get acces to them
    const {isLoading, errorMessage, docSnapchots} = queryState;

    let contents;

    if(isLoading) contents = "Loading...";
    else if (errorMessage) contents = {errorMessage};
    else contents = docSnapchots.map(doc => <Student data={doc.data()} />);

    return(
        <div>
         <h3>Read All students</h3>
         {contents}
        </div>
    );
    
}

export default GetAllStudents;

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

readAllUseres();*/