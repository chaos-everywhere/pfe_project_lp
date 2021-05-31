import React from 'react'
import { AppBar, makeStyles, Toolbar, Typography} from "@material-ui/core";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Link, useHistory, NavLink } from "react-router-dom";
import { IconButton } from '@material-ui/core';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';


const useStyles = makeStyles(() => ({
  typographyStyles:{
      flex: 1
  },
  icon_hover:{
    color: "#bdc3c7",
    "&:hover": {
      color: "#ffff",
      textDecoration: "none"
    }
  },
  icon:{
    fontSize: 32
  }
}));



function Header() {
    const classes = useStyles();
   return (
       <AppBar position="static">
           <Toolbar>
              <Typography className={classes.typographyStyles}>Espace Numérique De Travail EST</Typography>
              <IconButton className={classes.icon_hover} activeStyle={{ color:'#ffff'}} component={NavLink} exact to='/'>
                <DashboardOutlinedIcon className={classes.icon}/> 
              </IconButton>
              <IconButton className={classes.icon_hover}  activeStyle={{ color:'#ffff'}} component={NavLink} to='/Profile'>
                <AccountCircleOutlinedIcon className={classes.icon}/> 
              </IconButton>
           </Toolbar>
       </AppBar>
   )
}
export default Header;
