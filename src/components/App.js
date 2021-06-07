import React from "react"
import Signup from "./Signup"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import { Grid } from '@material-ui/core'
import Header from './Header'
import HomeContent from "./HomeContent"
import Schedule from "./Schedule"
import EScolarite from "./EScolarite"
import ProfileEtudiant from "./ProfileEtudiant"
import Actualite from "./Actualite"

function App() {
  return (
    
        <Router>
          <AuthProvider>
            <Switch>
            
              <Route path="/login" component={Login} />
                
              <div>
              <Grid container direction="column">
                <Grid item>
                  <PrivateRoute  path="/" component={Header} />
                </Grid>

                <PrivateRoute path="/EScolarite" component={EScolarite} />
                <PrivateRoute path="/Actualites" component={Actualite} />


                <Grid item container>
                  <Grid item xs={false} sm={2}/>
                  <Grid item xs={12} sm={8}>
                    <PrivateRoute exact path="/" component={HomeContent} />
                    <PrivateRoute exact path="/Profile" component={Dashboard} />
                    <PrivateRoute path="/update-profile" component={UpdateProfile} />
                    <PrivateRoute path="/Schedule" component={Schedule} />
                    <PrivateRoute path="/ProfileEtudiant" component={ProfileEtudiant} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/forgot-password" component={ForgotPassword} />
                  </Grid>
                  <Grid item xs={false} sm={2}/>
                </Grid>
              </Grid>
              </div>

            </Switch>
          </AuthProvider>
        </Router>
    
  )
}

export default App
