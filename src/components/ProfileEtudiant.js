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


  const rows = [
    'Nom',
    'Prenom',
    'Lieu de naissance',
    'Date  naissance',
    'CNE',
    'CNI',
    'Code apogée',
    'Email',
    'Filière',
    'Telephone',
  ];
  /*
  const rows = [
    createData('Nom'),
    createData('Prenom'),
    createData('Lieu de naissance'),
    createData('CNE'),
    createData('CNI'),
    createData('Code apogée'),
    createData('Email'),
    createData('Filière'),
    createData('Telephone'),
  ];*/
  
 

 function ProfileEtudiant (){
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [items, setItems] = useState([]);
  const [infos, setInfos] = useState([]);



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
            console.log(rows);
            rows.map((key, index) => {
                console.log(key);
            });
            

            setInfos(rows)

        
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
                          <TableRow key={index}>
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