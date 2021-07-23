import React from 'react';
import { Link } from '@reach/router';
import { navigate } from '@reach/router';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

export default props => {
    const { removeFromDom } = props;
    const deletePet = (petId) => {
        axios.delete('http://localhost:8000/api/pet/' + petId)
            .then(res => {
                removeFromDom(petId)
                navigate("/pet")
            })
    }
    return(
        <div>
            {props.pet.map((pet, index)=>{
                return <table >
                    <tr>
                        <th> Name </th>
                        <th> Type </th>
                        <th> Actions </th>
                    </tr>
                    <tr>
                        <td><p> {pet.name} </p></td>
                        <td>{pet.type}</td>
                        <td>
                            <button><Link to ={"/pet/" + pet._id}> Details</Link> </button>
                            <button><Link to={"/pet/" + pet._id + "/edit"}>Edit</Link></button>
                        </td>
                    </tr>
                </table>
            })}
        </div>
    )
}