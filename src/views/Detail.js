import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import { Link } from '@reach/router';
export default props => {
    const [pet, setPet] = useState({})
    const [like, setLike] = useState(0)

    const deletePet = (petId) => {
        axios.delete('http://localhost:8000/api/pet/' + petId)
            .then(res => {
                navigate("/pet")
            })
            .catch(err => console.log("Error:", err))

        }
    const PetLikes = () => {
        axios.get("http://localhost:8000/api/pet/" + props._id)
            .then(response => {
                setPet(response.data)
                console.log(response)
            })
            .catch(err => console.log("Error:", err))
        }

    const likeAPet = petId =>{
        axios.put("http://localhost:8000/api/pet/like/" + petId, {
            like
        })
        .then(res=> {console.log(res)
            PetLikes();
            
        })
        .catch(err => console.log(err))
        document.getElementById('button').setAttribute("disabled", "disabled");

    }

    useEffect(()=> {
        axios.get("http://localhost:8000/api/pet/" + props.id)
            .then(res => setPet(res.data))
    }, [])
    return(
        <div>
            <h1>Pet Shelter</h1>
            <div>
            <button onClick={(e)=>{deletePet(pet._id)}}> Adopt {pet.name} </button>
            <div>
            <Link to={"/pet"}>
                Home
            </Link>
            </div>
            <h2>Details about: {pet.name}</h2>
            </div>
            <p>Pet Type: {pet.type}</p>
            <p>Description: {pet.description} </p>
            <div>
            <p>Skills: </p>
            <p>{pet.skillA}</p>
            <p>{pet.skillB} </p>
            <p>{pet.skillC}</p>
            </div>
            <Link to={"/pet/" + pet._id + "/edit"}>
                Edit
            </Link>
            <p>Likes: {pet.like}</p>
            <button onClick={ e => {likeAPet(pet._id)}} id="button">Like {pet.name}</button>
        </div>
    )
}