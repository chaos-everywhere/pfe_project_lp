import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, CardMedia  } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom"




const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 500,
      marginBottom: 20
    },
    caption:{
      fontSize: 17,
      fontWeight: 500
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
}));

function ActualityCard(props) {
   const classes = useStyles();
   const {imgSrc, title, subtitle, description} = props;
  
   return (
    <Card className={classes.root}>
      <CardHeader
        titleTypographyProps={{variant:'h6' }}
        title={title}
        subheader={subtitle}
      />
      <CardMedia
        className={classes.media}
        image={imgSrc}
      />
      <CardContent>
        <Typography className={classes.caption} variant="subtitle1" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
    </Card>
   )
}
export default ActualityCard;
