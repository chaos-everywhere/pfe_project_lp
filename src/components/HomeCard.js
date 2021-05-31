import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom"




const useStyles = makeStyles({
    card_hover:{
      "&:hover": {
          color: "#636e72",
          textDecoration: "none"
      }
    },
    root: {
      minHeight: 150,
    },
    title: {
      fontSize: 18,
    },
    icon: {
      fontSize: 40,
      marginBottom: 10
    },
    
  });

function HomeCard(props) {
   const classes = useStyles();
   const {title, cardColor, icon, url} = props;
   const Tag_icon = icon;
  

   

   return (
    <Card className={classes.card_hover} component={Link}
    to={url}>
        <CardActionArea style={{backgroundColor: cardColor}} className={classes.root}>
            <CardContent>
                <Grid 
                align="center" justify= "center"
                >
                    <Tag_icon className={classes.icon}/>
                    <Typography className={classes.title}>
                        {title}
                    </Typography>
                </Grid>
            </CardContent>
        </CardActionArea>
    </Card>
   )
}
export default HomeCard;
