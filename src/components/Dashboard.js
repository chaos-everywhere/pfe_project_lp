import React, { useState } from "react"
import { Container, Card, Button, Alert } from "react-bootstrap"
import { ImageBackground, StyleSheet, Text, View } from "react";
import {useEffect} from "react"
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  //query state
  const [queryState, setQuerystate] = useState({
    isLoading: true,
    errorMessage: "",
    docSnapchots: null,
  });

  useEffect(() => {
    async function getLogedUser(){
        try{
            //Short way
            setQuerystate({isLoading: true, errorMessage: "", docSnapchots:null});

            const snapshot = await db.collection("Users").doc(currentUser.uid).get();

            setQuerystate({isLoading: false, errorMessage: "", docSnapShot:snapshot});

            if(!snapshot.exists){
              console.log(`doc not found with id: no students with id${currentUser.uid}`);
            }else{
             console.log(`Sucsess user found!`);
             console.log(snapshot.id);
             console.log(snapshot.data());
            }               
        
          }catch(err){
            setQuerystate({
                isLoading: false,
                errorMessage: "Could not connect to database",
                docSnapchots:null
                });
            console.error(err);
          }
    }
    
    getLogedUser();
  }, []);  

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <Container
    className="d-flex align-items-center justify-content-center"
    style={{minHeight: "100vh"}}
    >
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Modifier mon compte
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Se déconnecter
        </Button>
      </div>
    </div>
    </Container>
  )
}
