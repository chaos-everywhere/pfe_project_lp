import React, { useState } from 'react';
import { db } from '../firebase';

//internal student component 
function Student({ data }){
    return (
        <div>
            <p>{data.age}</p>
            <p>{data.name}</p>
        </div>
    );
}

function GetOneStudent(){
    const [queryState, setQuerystate] = useState({
        isLoading: false,
        errorMessage: "",
        docSnapShot: null
    })
    const [userId, setUserId] = useState("");

    const onClick = async() =>{
        try {
            //remove errorMsg from previous query remove docsnapshot data to null
            setQuerystate({isLoading: true, errorMessage: "", docSnapShot:null});

            const snapshot = await db.collection("students_test").doc(userId).get();

            setQuerystate({isLoading: false, errorMessage: "", docSnapShot:snapshot});

            if(!snapshot.exists){
              console.log(`doc not found with id: no students with id${userId}`);
            }else{
             console.log(`Sucsess student found!`);
             console.log(snapshot.id);
             console.log(snapshot.data());
            }
          } catch (err) {
             setQuerystate({
                isLoading: false, 
                errorMessage: "could not connect to database",
                docSnapShot:null
            });
            console.error(err);
        }
    };
    
    //distructure our state variables to get acces to them
    const {isLoading, errorMessage, docSnapShot} = queryState;
    
    let contents;
    if(isLoading) contents = "Loading...";
    else if (errorMessage) contents = {errorMessage};
    else if (docSnapShot === null) contents = <p>search for students to see result here</p>;
    else if (!docSnapShot.exists) contents = <p>No user found</p> ;
    else contents = <Student data={docSnapShot.data()}/>;

    return(
     <div>
        <h3>Get specific user</h3>
        <label> 
           User Id: <input type="text" onChange={e =>setUserId(e.target.value)}/>
        </label>
        <button onClick={onClick}>getUser</button>
        {contents}
     </div>
    );
}

export default GetOneStudent;


/*
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