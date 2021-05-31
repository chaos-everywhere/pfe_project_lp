import React from "react"
import {AppBar,Tabs,Tab} from '@material-ui/core';
import NotesEtRes from './NotesEtRes';
import ReleveNotes from './ReleveNotes';
import AttReussite from './Attreusite';
import AttInscription from './AttInscription';


const EScolarite = () =>{
    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleChange = (event, newValue) => {
      setSelectedTab(newValue);
    };

    return (
      <>  
       <AppBar style={{ background: '#4b7bec'}} position="static" elevation={1} > 
            <Tabs value={selectedTab} onChange={handleChange}>
            <Tab label="Notes et Résultats" />
            <Tab label="Relevé de notes"  />
            <Tab label="attestation de reussite"  />
            <Tab label="attestation d'inscription" />
            </Tabs>
        </AppBar>
        {selectedTab === 0 && <NotesEtRes />}
        {selectedTab === 1 && <ReleveNotes />}
        {selectedTab === 2 && <AttReussite />}
        {selectedTab === 3 && <AttInscription />}
      </> 
    );
};

export default EScolarite;