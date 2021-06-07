import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext"
import {useEffect} from "react"

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    title:{
      margin: 30,
      textAlign: 'center'
    },
    pad_cell1: {
      paddingLeft: 80
    },
    pad_cell2: {
      paddingLeft: 140
    },
  });

 

  

  
 

function NotesEtRes (){
  const classes = useStyles();
  const { currentUser } = useAuth();

  const [modules, setModules] = useState([]);

  //get all data query
  const [queryState, setQuerystate] = useState({
    isLoading: true,
    errorMessage: "",
    docSnapchots: null,
  });

  //get loged user query
  const [userQueryState, setUserQueryState] = useState({
    isLoading: true,
    errorMessage: "",
    docSnapchots: null,
  });

  useEffect(() => {
    let loged_user_id;
    let items = [];

    async function getAllUsers(){
        try{

            setUserQueryState({isLoading: true, errorMessage: "", docSnapchots:null});
            const snapshot = await db.collection("Users").doc(currentUser.uid).get();
            setUserQueryState({isLoading: false, errorMessage: "", docSnapShot:snapshot});

            if(!snapshot.exists){
              console.log(`doc not found with id: no students with id${currentUser.uid}`);
            }else{
             console.log(`Sucsess user found!`);
             //get loged user document id
             loged_user_id = snapshot.id;
             console.log(loged_user_id);
            } 

            try{
              //Short way
              setQuerystate({isLoading: true, errorMessage: "", docSnapchots:null});

              const snapshot1 = await db.collection("notes").doc(currentUser.uid).collection("modules").get();
              const docSnapchots = snapshot1.docs;

              setQuerystate({isLoading: false, errorMessage: "", docSnapchots});

              //console.log(docSnapchots); 

              docSnapchots.map(doc => items.push(doc.data()) );
              console.log(items)

              //set Modules state:
              setModules(items);
          
            }catch(err){
              setQuerystate({
                  isLoading: false,
                  errorMessage: "Could not connect to database",
                  docSnapchots:null
                  });
              console.error(err);
            }
            
                      
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

           

   
  return (
    <>
    <h4 className={classes.title}>Notes et résultats année Universitaires 2020-2021</h4>
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center" colSpan={2}>Session 1</TableCell>
            <TableCell align="center" colSpan={2}>Session 2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Note</TableCell>
            <TableCell align="center">Resultat</TableCell>
            <TableCell align="center">Note</TableCell>
            <TableCell align="center">Resultat</TableCell>
          </TableRow>
        </TableHead>
        <TableBody> 
            <TableRow>
              <TableCell align="left" component="th" scope="row" padding="none">
               3ème année LP : Ingénierie des Applications Mobiles	
              </TableCell>
                  
              <TableCell align="center">14</TableCell>
              <TableCell align="center">validé</TableCell>
              <TableCell align="center">{}</TableCell>
              <TableCell align="center">{}</TableCell>
            </TableRow>   
            
          {modules.map((module, id) => (
            <>
            <TableRow key={id}>
              <TableCell className={classes.pad_cell1} align="left" component="th" scope="row" padding="none">
                {module.nom}
              </TableCell>

              <TableCell align="center">{module.note}</TableCell>
              <TableCell align="center">{module.resultat}</TableCell>
              <TableCell align="center">{}</TableCell>
              <TableCell align="center">{}</TableCell>
            </TableRow>
            
            {module.matieres.map((mat, key) => (
            <TableRow key={key}>
              <TableCell className={classes.pad_cell2} align="left" component="th" scope="row" padding="none">
                {mat.nom}
              </TableCell>

              <TableCell align="center">{mat.note}</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">{}</TableCell>
              <TableCell align="center">{}</TableCell>
            </TableRow>
            ))}

            </>
          ))}

            

            
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default NotesEtRes;

/*

 {mat.map((row) => (
            <TableRow key={row.modele}>
              <TableCell align="center" component="th" scope="row" padding="none">
                {row.matiere}
              </TableCell>

              <TableCell align="center">{row.not}</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">{}</TableCell>
              <TableCell align="center">{}</TableCell>
            </TableRow>
          ))}


          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center" component="th" scope="row" padding="none">
                {row.modele}
              </TableCell>
                  
              <TableCell align="center">{row.note1}</TableCell>
              <TableCell align="center">{row.resultat1}</TableCell>
              <TableCell align="center">{}</TableCell>
              <TableCell align="center">{}</TableCell>
            </TableRow>
          ))}




          <h4 className={classes.title}>Notes et résultats année Universitaires 2020-2021</h4>
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center" colSpan={2}>Session 1</TableCell>
            <TableCell align="center" colSpan={2}>Session 2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Note</TableCell>
            <TableCell align="center">Resultat</TableCell>
            <TableCell align="center">Note</TableCell>
            <TableCell align="center">Resultat</TableCell>
          </TableRow>
        </TableHead>
        <TableBody> 
            <TableRow>
              <TableCell align="center" component="th" scope="row" padding="none">
               3ème année LP : Ingénierie des Applications Mobiles	
              </TableCell>
                  
              <TableCell align="center">14</TableCell>
              <TableCell align="center">validé</TableCell>
              <TableCell align="center">{}</TableCell>
              <TableCell align="center">{}</TableCell>
            </TableRow>   
            
            <TableRow>
              <TableCell align="center" component="th" scope="row" padding="none">
                Entreprenariat et communication	
              </TableCell>
                  
              <TableCell align="center">13.85</TableCell>
              <TableCell align="center">validé</TableCell>
              <TableCell align="center">{}</TableCell>
              <TableCell align="center">{}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className={classes.pad_cell} align="left" component="th" scope="row" padding="none">
                Entreprenariat
              </TableCell>      
              <TableCell align="center">12.20</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">{}</TableCell>
              <TableCell align="center">{}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.pad_cell} align="left" component="th" scope="row" padding="none">
              Anglais Technique	
              </TableCell>  
              <TableCell align="center">15.50</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">{}</TableCell>
              <TableCell align="center">{}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center" component="th" scope="row" padding="none">
              Design des systèmes interactifs	
              </TableCell>
                  
              <TableCell align="center">14.00</TableCell>
              <TableCell align="center">validé</TableCell>
              <TableCell align="center">{}</TableCell>
              <TableCell align="center">{}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className={classes.pad_cell} align="left" component="th" scope="row" padding="none">
              Conception des IHM et test d’utilisabilité	
              </TableCell>      
              <TableCell align="center">14.00</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">{}</TableCell>
              <TableCell align="center">{}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.pad_cell} align="left" component="th" scope="row" padding="none">
               Interactions et design UX	
              </TableCell>  
              <TableCell align="center">14.00</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">{}</TableCell>
              <TableCell align="center">{}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center" component="th" scope="row" padding="none">
                 Web pour mobile		
              </TableCell>
                  
              <TableCell align="center">12:00</TableCell>
              <TableCell align="center">validé</TableCell>
              <TableCell align="center">{}</TableCell>
              <TableCell align="center">{}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className={classes.pad_cell} align="left" component="th" scope="row" padding="none">
              Services Web	
              </TableCell>      
              <TableCell align="center">12:00</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">{}</TableCell>
              <TableCell align="center">{}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.pad_cell} align="left" component="th" scope="row" padding="none">
              Programmation Web	
              </TableCell>  
              <TableCell align="center">12:00</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">{}</TableCell>
              <TableCell align="center">{}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
*/