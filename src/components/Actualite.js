import React from 'react'
import ActualityCard from './ActualityCard';
import { Container } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import {useEffect, useState} from "react";
import { db } from "../firebase";
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles({
    root: {
      marginTop: 40
    }
  });

function Actualite (){
    const [queryState, setQuerystate] = useState({
        isLoading: true,
        errorMessage: "",
        docSnapchots: null,
    });
    const classes = useStyles();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const items = [];

        async function getActualites(){
            try{
                //Short way
                setQuerystate({isLoading: true, errorMessage: "", docSnapchots:null});

                const snapshot = await db.collection("Actualites").get()
                const docSnapchots = snapshot.docs;

                setQuerystate({isLoading: false, errorMessage: "", docSnapchots});

                console.log(docSnapchots) ;               

                docSnapchots.forEach(function(doc) {
                    items.push(doc.data());
                  });
                setItems(items);
                console.log(items);
            
              }catch(err){
                setQuerystate({
                    isLoading: false,
                    errorMessage: "Could not connect to database",
                    docSnapchots:null
                    });
                console.error(err);
              }
        }
        
        getActualites();
    }, []);
    
    const getActualityCard = (ActualityObj) => {
        //const {title, subtitle, imgurl, caption} = ActualityObj
        return <ActualityCard {...ActualityObj} />; 
    };

    const {isLoading, errorMessage, docSnapchots} = queryState;
    let contents;
    if(isLoading) contents =  <CircularProgress />;
    else if (docSnapchots === null) contents = <p></p>;
    else contents = <div className="w-100" style={{ maxWidth: "500px" }}>
                    {items.map(ActualityObj => getActualityCard(ActualityObj))}
                   </div>;



   
    

    return (
    <>
       <h3 style={{paddingLeft: 30, paddingTop: 30}}>Actualités EST</h3>
       <h5 style={{paddingLeft: 30, paddingBottom: 20}}>Ici, vous recevrez les dernières nouvelles de L'école et plus...</h5>
       <Container
        className="d-flex align-items-center justify-content-center"
        style={{minHeight: "100vh"}}
        >
                {contents}

        </Container>
        
    </>
    );
};

export default Actualite;


/*
const actualitys = [
        { title: 'Direction EST', subtitle: '29/05/2021', imgSrc: 'https://jeunessejecoute.ca/wp-content/uploads/sites/2/Back-to-School-Checklist-FR-FINAL-1.jpg', description: 'veuillez prendre toutes les précautions au cours de vos séance presentiel'}, 
        { title: 'Direction EST', subtitle: 'Direction', imgSrc: 'https://i.pinimg.com/474x/59/53/6b/59536bba8e9cd7cf428c0a7532877882.jpg', description: 'veuillez prendre tous les procutin pendant Covid'}, 
        { title: 'Direction EST', subtitle: 'Direction', imgSrc: 'https://i.pinimg.com/474x/59/53/6b/59536bba8e9cd7cf428c0a7532877882.jpg', description: 'veuillez prendre tous les procutin pendant Covid'}, 
];
 */

/*<Grid container className={classes.root}>
        <Grid item xs={false} sm={12}/>
            <Grid item xs={12} sm={8}>
                <ActualityCard/> 
            </Grid>
            <Grid item xs={12} sm={8}>
                <ActualityCard/> 
            </Grid>
        <Grid item xs={false} sm={4}/>
        </Grid>  


         <ActualityCard imgSrc="https://i.pinimg.com/474x/59/53/6b/59536bba8e9cd7cf428c0a7532877882.jpg" title="Direction EST" subtitle="20/03/2021 12:00" description="veuillez prendre tous les procutin pendant Covid"/> 
            <ActualityCard imgSrc="https://i.pinimg.com/474x/59/53/6b/59536bba8e9cd7cf428c0a7532877882.jpg" title="Direction EST" subtitle="20/03/2021 12:00" description="veuillez prendre tous les procutin pendant Covid"/> 
            
*/