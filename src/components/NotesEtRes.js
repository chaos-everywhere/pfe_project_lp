import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    title:{
      margin: 30,
      textAlign: 'center'
    }
  });

  function createData(modele, note1, resultat1, note2, resultat2) {
    return { modele, note1, resultat1, note2, resultat2};
  }

  const rows = [
    createData('systeme information', 12, "valide", 24, 4.0),
    createData('Genie Logiciel', 10, "non valide", 37, 4.3),
    createData('Modelisation objet', 14, "valide", 24, 6.0),
    createData('Management Industriel', 12, "valide", 67, 4.3),
    createData('Programmation objet', 10.63, "non valide", 49, 3.9),
  ];
 

 function NotesEtRes (){
  const classes = useStyles();
   
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
          {rows.map((row) => (
            <TableRow key={row.modele}>
              <TableCell align="center" component="th" scope="row" padding="none">
                {row.modele}
              </TableCell>

              <TableCell align="center">{row.note1}</TableCell>
              <TableCell align="center">{row.resultat1}</TableCell>
              <TableCell align="center">{row.note2}</TableCell>
              <TableCell align="center">{row.resultat2}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default NotesEtRes;