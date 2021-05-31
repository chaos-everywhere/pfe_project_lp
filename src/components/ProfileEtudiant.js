import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
import {useEffect} from "react"
import { Container } from "react-bootstrap"
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext"
import CircularProgress from '@material-ui/core/CircularProgress';

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    root: {
      marginTop: 40
    },
    tabcell: {
      fontWeight: 600,
      paddingLeft: 80
    },
    pad_cell: {
      paddingLeft: 200
    },
    title: {
      marginTop: 20
    }
  });

  function createData(information, value) {
    return {information, value};
  }

  const rows = [
    createData('Nom', "valide"),
    createData('Prenom', "non valide"),
    createData('Cod Apogée', "1234J2"),
    createData('Date de nessance', "1999/01/13"),
    createData('Numero de telephone',"062344322"),
  ];
 

 function ProfileEtudiant (){
  const classes = useStyles();
  const { currentUser, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [infos, setInfos] = useState([]);

  const [products, setProducts] = useState([
    {code:1, name:"apple"},
    {code:2, name:"laptop"},
    {code:3, name:"tacos"},
  ]);

  //query state
  const [queryState, setQuerystate] = useState({
    isLoading: true,
    errorMessage: "",
    docSnapchots: null,
  });

  ///Load data from fb on component creation
  useEffect(() => {
    const items = [];
    let informations;

    async function getLogedUser(){
        try{
            //Short way
            setQuerystate({isLoading: true, errorMessage: "", docSnapchots:null});

            const snapshot = await db.collection("Users").doc(currentUser.uid).get();

            setQuerystate({isLoading: false, errorMessage: "", docSnapShot:snapshot});

            if(!snapshot.exists){
              console.log(`doc not found with id: no students with id${currentUser.uid}`);
            }else{
             console.log(`Sucsess user found!`);
             console.log(snapshot.id);
             //console.log(snapshot.data());

             items.push(snapshot.data());
             console.log(items[0]);
             setItems(items);
            }      

            informations = Object.keys(items[0]);
            console.log(informations);
            setInfos(informations)

        
          }catch(err){
            setQuerystate({
                isLoading: false,
                errorMessage: "Could not connect to database",
                docSnapchots:null
                });
            console.error(err);
          }
    }
    
    getLogedUser();
  }, []);  

  //distructure our state variables to get acces to them
  const {isLoading, errorMessage, docSnapShot} = queryState;
    
  let contents;
  if(isLoading) contents = <Container
                            className="d-flex align-items-center justify-content-center"
                            style={{minHeight: "100vh"}}
                            >
                                <CircularProgress />
                            </Container>;
  else if (errorMessage) contents = {errorMessage};
  else if (docSnapShot === null) contents = <p></p>;
  else if (!docSnapShot.exists) contents = <p>Pas de données pour cet etudiant</p> ;
  else contents = <TableContainer  className={classes.root} component={Paper}>
                    <Table className={classes.table}>
                      <TableHead>
                        
                      </TableHead>
                      <TableBody>
                        {infos.map((key, index) => (
                          <TableRow>
                            <TableCell align="left" className={classes.tabcell} component="th" scope="row" padding="none">
                              {key}
                            </TableCell>
                            <TableCell className={classes.pad_cell}  align="left">{`${items[0][key]}`}</TableCell>
                          
                          </TableRow>
                        ))}
                      </TableBody>
                    
                    </Table>
                  </TableContainer>;
   
  return (
    <>
    <h3 className={classes.title}>Mon profile</h3>
    {contents}
    </>
  );
};

export default ProfileEtudiant;

/*  <TableBody>
</TableContainer>
{rows.map((row, i) => (
  <TableRow key={row.modele}>
  <TableCell align="left" className={classes.tabcell} component="th" scope="row" padding="none">
  {Object.keys({items})[i]}
              </TableCell>
              <TableCell align="left">{row.value}</TableCell>
             
            </TableRow>
          ))}
        </TableBody> 
        
   <ul>
    {
      infos.map((key, index) => (
        <li>{`${key} : ${items[0][key]}`}</li>
      )
    )}
    </ul>  
    
    
      <TableContainer  className={classes.root} component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          
        </TableHead>
        <TableBody>
          {infos.map((key, index) => (
            <TableRow>
              <TableCell align="left" className={classes.tabcell} component="th" scope="row" padding="none">
                {key}
              </TableCell>
              <TableCell align="left">{`${key} : ${items[0][key]}`}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      
      </Table>
    </TableContainer>


    <>
    <h3 className={classes.title}>Mon profile</h3>
    <TableContainer  className={classes.root} component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          
        </TableHead>
        <TableBody>
          {infos.map((key, index) => (
            <TableRow>
              <TableCell align="left" className={classes.tabcell} component="th" scope="row" padding="none">
                {key}
              </TableCell>
              <TableCell className={classes.pad_cell}  align="left">{`${items[0][key]}`}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      
      </Table>
    </TableContainer>
    </>
        
        */