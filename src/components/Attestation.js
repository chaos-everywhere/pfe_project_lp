import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Swal from "sweetalert2";  
import { Button, Grid, Card, CardContent  } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    mrg_grid: {
        marginTop: 150
    },
    mrg_btn: {
        marginTop: 30
    }
  });

 function EvoyerDemande() {
    Swal.fire({  
        title: 'Vous etes sure?',  
        text: 'Une Demande va etre envoyer à ladministration',  
        icon: 'question',  
        showCancelButton: true,  
        confirmButtonColor: '#3085d6',  
        cancelButtonColor: '#d33',  
        confirmButtonText: 'Confirmer',
        cancelButtonText:  'Anuler'
    });  
 }

 function Attestation (){
    const classes = useStyles();

    return (
        <Grid item container className={classes.mrg_grid}>
            <Grid item xs={false} sm={4}/>
            <Grid item xs={12} sm={8}>
                <Grid item xs={12} sm={6}>
                <Card  className={classes.root} variant="outlined">
                    <CardContent>
                        <Grid 
                        align="center" justify= "center"
                        >
                            <h4>Demande D'attestation de reussite année Universitaires 2020-2021</h4>
                            <Button onClick={EvoyerDemande} className={classes.mrg_btn} variant="contained" color="primary">Nouvelle demande</Button>
                        </Grid>
                    </CardContent>
                </Card>
                </Grid>
            </Grid>
            <Grid item xs={false} sm={4}/>
        </Grid>
    );
};

export default Attestation;