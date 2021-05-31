import React from 'react';
import {useEffect, useState} from "react"
import { db } from "../firebase";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import GetAllStudents from "../firebase/get_all_students"
import GetOneStudent from "../firebase/get_one_student"
  

function Schedule() {
  const [queryState, setQuerystate] = useState({
    isLoading: true,
    errorMessage: "",
    docSnapchots: null,
  });
  const [items, setItems] = useState("");


  useEffect(() => {
    const items = [];

    async function getAllResources(){
        try{
            //Short way
            setQuerystate({isLoading: true, errorMessage: "", docSnapchots:null});

            const snapshot = await db.collection("Resources").get()
            const docSnapchots = snapshot.docs;
           
            docSnapchots.forEach(function(doc) {
              items.push(doc.data());
            });
            setItems(items);


        
          }catch(err){
            setQuerystate({
                isLoading: false,
                errorMessage: "Could not connect to database",
                docSnapchots:null
                });
            console.error(err);
          }
    }
    
    getAllResources();
  }, []);

  return( 
    <>
      <h3 style={{paddingTop: 30, paddingTop: 30}}>Mon emploi du temps</h3>
      <FullCalendar
        plugins={[ dayGridPlugin,resourceTimeGridPlugin ]}
        initialView="resourceTimeGridDay"
        resources={items}
        locale = 'fr' 
        buttonText={{today: "Aujourd'hui"}}
        events={[
          { id: '1', resourceId: 'a', startTime: '09:00', endTime: '12:15', title: 'Mobilité et geolocalisation', daysOfWeek: [ 1] },
          { id: '2', resourceId: 'e', startTime: '10:00', endTime: '12:00', title: 'Android', daysOfWeek: [ 1, 2 ] },
          { id: '3', resourceId: 'd', startTime: '13:00', endTime: '15:00', title: 'Comunication C', daysOfWeek: [ 1,2 ] },
          { id: '4', resourceId: 'a', startTime: '15:00', endTime: '17:00', title: 'Java avancée', daysOfWeek: [ 1, 2, 4 ] },
        ]
        }
        slotMinTime  = '8:00'
        slotMaxTime = '19:00'
        allDaySlot= {false}
      />
    </>
    )
 }
 export default Schedule;

 /*
 resources={[
          { id: 'a', title: 'Salle 01' },
          { id: 'b', title: 'Room 21', eventColor: 'green' },
          { id: 'c', title: 'Emphi 60', eventColor: 'orange' },
          { id: 'd', title: 'Salle 03', eventColor: 'red' },
          { id: 'e', title: 'Salle 04', eventColor: 'red' },
        ]}
        events={[
          { id: '1', resourceId: 'a', startTime: '09:00', endTime: '12:15', title: 'Mobilité et geolocalisation', daysOfWeek: [ 1] },
          { id: '2', resourceId: 'e', startTime: '10:00', endTime: '12:00', title: 'Android', daysOfWeek: [ 1, 2 ] },
          { id: '3', resourceId: 'b', startTime: '13:00', endTime: '15:00', title: 'Comunication C', daysOfWeek: [ 1, 3 ] },
          { id: '4', resourceId: 'a', startTime: '15:00', endTime: '17:00', title: 'Java avancée', daysOfWeek: [ 1, 2, 4 ] },
        ]
}

    ////references
          <h1>Students</h1>
      <GetAllStudents />
      <GetOneStudent />
 */ 