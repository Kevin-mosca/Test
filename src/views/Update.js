import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';
import { Link } from '@reach/router';

export default props => {
    const { id } = props;
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const[skillA, setSkillA] = useState('');
    const[skillB, setSkillB] = useState('');
    const[skillC, setSkillC] = useState('');
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8000/api/pet/' + id)
        .then(res => {
            setName(res.data.name);
            setType(res.data.type);
            setDescription(res.data.description);
            setSkillA(res.data.skillA);
            setSkillB(res.data.skillB);
            setSkillC(res.data.skillC);
        })
        .catch(err => console.log(err))
    }, [])
    const updatePet = e => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/pet/' + id, {
            name,
            type,
            description,
            skillA,
            skillB,
            skillC
            
        })
        .then(res=>{
            if(res.data.errors){
                setErrors(res.data.errors);
            }
            else{
               navigate("/pet") 
            }
            console.log(res)
        })
        .catch(err=>{
            const errorResponse = err.response.data.errors; 
            const errorArr = [];
             
            for (const key of Object.keys(errorResponse)) { 
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
        })   
    }
    return(
        <div>
            <h1>Pet Shelter</h1>
            <h3>Edit {name}</h3>
            <form onSubmit={updatePet}>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
                <p>
                    <label>Name</label><br/>
                    <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value)}} />
                </p>
                <p>
                    <label>Type</label><br/>
                    <input type="text" name="type" value={type} onChange={(e) => { setType(e.target.value)}} />
                </p>
                <p>
                    <label>Description</label><br/>
                    <input type="text" name="description" value={description} onChange={(e) => { setDescription(e.target.value)}} />
                </p>
                <p>
                    <label>SkillA</label><br/>
                    <input type="text" name="skillA" value={skillA} onChange={(e) => { setSkillA(e.target.value)}} />
                </p>
                <p>
                    <label>SkillB</label><br/>
                    <input type="text" name="skillB" value={skillB} onChange={(e) => { setSkillB(e.target.value)}} />
                </p>
                <p>
                    <label>SkillC</label><br/>
                    <input type="text" name="skillC" value={skillC} onChange={(e) => { setSkillC(e.target.value)}} />
                </p>
                <input type="submit" />
            </form>
            <div>
                <Link to={"/pet"}>
                    Cancle
                </Link>
            </div>
            
        </div>
    )
}