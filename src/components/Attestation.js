import React, { useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Swal from "sweetalert2";  
import { useAuth } from "../contexts/AuthContext"
import { db } from "../firebase";
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

 
 

 function Attestation (props){
    const {title} = props;
    const classes = useStyles();
    const { currentUser } = useAuth();
    const [date, setDate] = useState("");


    useEffect(() => {
    
        function getDate(){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
    
            today = mm + '/' + dd + '/' + yyyy;
            setDate(today);
        }
        
        getDate();
      }, []);  

    

    async function addDemande(){ 
        try{
          const docRef = await db.collection("DemandeDocument").add({
            id_user: currentUser.uid,
            demandeTitle: title,
            date: date
          });
          console.log(`succesfuly added new user at  ${docRef.id}`);
      
        }catch(err){
          console.error(err);
        }
      }
      
    function EnvoyerDemande() {
        Swal.fire({  
            title: 'Voulez vous poursuivre',  
            text: 'Votre demande sera envoyé à ladministration',  
            icon: 'question',  
            showCancelButton: true,  
            confirmButtonColor: '#3085d6',  
            cancelButtonColor: '#d33',  
            confirmButtonText: 'Confirmer',
            cancelButtonText:  'Anuler',
        })
        .then((willDelete) => {
            if (willDelete.isConfirmed) {
                addDemande(); 
            }else {
                alert("demande non");
                console.log(willDelete);
            }
        });
    }

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
                            <h4>{title} année Universitaires 2020-2021</h4>
                            <Button onClick={EnvoyerDemande} className={classes.mrg_btn} variant="contained" color="primary">Nouvelle demande</Button>
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


/*
async function adddemande(demande){ 
  try{
    const docRef = await db.collection("DemandeDocument").add(demande)
    console.log(`succesfuly added new user at  ${docRef.id}`);

  }catch(err){
    console.error(err);
  }
}

adddemande({
  id_user: "edy23icb33sios",
  demandeTitle: "Demande attestation d'inscription",
  date: "20/08/2021"
});*/