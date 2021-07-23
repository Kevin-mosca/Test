import axios from 'axios';
import React, {useEffect, useState } from 'react';
import { Link } from '@reach/router';
import PetForm from '../components/PetForm';
import PetList from '../components/PetList';



export default () => {
    const [pet, setPet] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        axios.get('http://localhost:8000/api/pet')
            .then(res=>{
                let ordered = (res.data);
                setPet(ordered.sort((a,b) => a.type.localeCompare(b.type)));
                setLoaded(true);
            })
            .catch(err => console.log(err));
            
    },[]);

    const removeFromDom = petId => {
        setPet(pet.filter(pet => pet._id != petId));
    }
    return(
        <div>
            <h1>Pet Shelter</h1>
            <h2>These Pets are looking for a good home</h2>
            <div>
            <Link to={"/pet/create"}>
                Add a Pet to the Shelter
            </Link>
            </div>
            <div class="container" style={{marginLeft: "500px"}}>
            {loaded && <PetList pet={pet} removeFromDom={removeFromDom}/>}
            
            </div>
                  
        </div>
    )
}