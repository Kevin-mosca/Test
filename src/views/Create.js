import axios from 'axios';
import React, {useEffect, useState } from 'react';
import { Link } from '@reach/router';


import PetForm from '../components/PetForm';
import PetList from '../components/PetList';

export default () => {
    const [pet, setPet] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        axios.get('http://localhost:8000/api/pet/create')
            .then(res=>{
                setPet(res.data);
                setLoaded(true);
            });
            
    },[]);

    const removeFromDom = petId => {
        setPet(pet.filter(pet => pet._id != petId));
    }
    return(
        <div>
            <h1>Pet Shelter</h1>
            <h2>Know A pet Needing a Home?</h2>
            <PetForm />
            <div>
                <Link to={"/pet"}>
                    Cancle
                </Link>
            </div>
        </div>
    )
}