import React, { useState } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';


export default () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const[skillA, setSkillA] = useState('');
    const[skillB, setSkillB] = useState('');
    const[skillC, setSkillC] = useState('');

    const [errors, setErrors] = useState([]);
    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/pet/create/new', {
            name,
            type,
            description,
            skillA,
            skillB,
            skillC
        })
            .then(res=>{
                console.log(res);
                navigate("/pet")
            })
            .catch(err=>{
                const errorResponse = err.response.data.errors; 
                const errorArr = [];
                const keys = null;
                for (const key of Object.keys(errorResponse)) { 
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    }
    return(
        <div>
            <form onSubmit={onSubmitHandler}>
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
        </div>
    )
}