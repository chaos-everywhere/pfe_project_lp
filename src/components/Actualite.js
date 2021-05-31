import React from 'react'
import { Grid } from '@material-ui/core';
import ActualityCard from './ActualityCard'
import { Container } from "react-bootstrap"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      marginTop: 40
    }
  });

function Actualite (){

    const classes = useStyles();

    const getActualityCard = (ActualityObj) => {
        //const {title, subtitle, imgurl, caption} = ActualityObj
        return <ActualityCard {...ActualityObj} />; 
    };
    const items = [
        { title: 'Direction EST', subtitle: 'Direction', imgSrc: 'https://i.pinimg.com/474x/59/53/6b/59536bba8e9cd7cf428c0a7532877882.jpg', description: 'veuillez prendre tous les procutin pendant Covid'}, 
        { title: 'Direction EST', subtitle: 'Direction', imgSrc: 'https://i.pinimg.com/474x/59/53/6b/59536bba8e9cd7cf428c0a7532877882.jpg', description: 'veuillez prendre tous les procutin pendant Covid'}, 
        { title: 'Direction EST', subtitle: 'Direction', imgSrc: 'https://i.pinimg.com/474x/59/53/6b/59536bba8e9cd7cf428c0a7532877882.jpg', description: 'veuillez prendre tous les procutin pendant Covid'}, 
    ];



    return (
    <>
       <h3 style={{padding: 30}}>Actualités EST</h3>
       <Container
        className="d-flex align-items-center justify-content-center"
        style={{minHeight: "100vh"}}
        >
            <div className="w-100" style={{ maxWidth: "500px" }}>
                {items.map(ActualityObj => getActualityCard(ActualityObj))}
            </div>

        </Container>
        
    </>
    );
};

export default Actualite;

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