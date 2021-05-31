import { Grid } from '@material-ui/core';
import React from 'react'
import HomeCard from './HomeCard';
import { makeStyles } from '@material-ui/core/styles';


import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import SchoolIcon from '@material-ui/icons/School';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';

const useStyles = makeStyles({
   root: {
     marginTop: 40
   }
 });


function HomeContent() {
   const classes = useStyles();

    return (
       <Grid container spacing={6} className={classes.root}>
           <Grid item xs={12} sm={4}>
              <HomeCard title="Profile Etudiant" cardColor="#ffeaa7" icon={AccountBoxOutlinedIcon} url="/ProfileEtudiant"/> 
           </Grid>
           <Grid item xs={12} sm={4}>
              <HomeCard title="E-Scolarité" cardColor="#7bed9f" icon={SchoolIcon} url="/EScolarite"/> 
           </Grid>
           <Grid item xs={12} sm={4}>
              <HomeCard title="Actualités" cardColor="#ff6b81" icon={EventNoteOutlinedIcon} url="/Actualites"/> 
           </Grid>
           <Grid item xs={12} sm={4}>
              <HomeCard title="Emploi du temps" cardColor="#74b9ff" icon={TodayOutlinedIcon} url="/Schedule"/> 
           </Grid>
       </Grid> 
    )
 }
 export default HomeContent;