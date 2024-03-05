import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import './Create.css';

const Create = () => {
  const [description, setDescription] = useState('');
  const [objectives, setObjectives] = useState([]);
  const [activityName, setActivityName] = useState('');
  const navigate = useNavigate();

  const themesCollection = collection(db, 'themes');

  const storeTheme = async (e) => {
    e.preventDefault();
    await addDoc(themesCollection, { description: description, objectives: objectives });
    navigate('/');
  };

  const addObjective = () => {
    setObjectives([...objectives, { name: activityName, status: 0 }]);
    setActivityName('');
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h2>Crear Tema</h2>
          <form onSubmit={storeTheme}>
            <div className='form-group'>
              <label htmlFor='description'>Tema</label>
              <input
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type='text'
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='objectives'>Objetivos</label>
              {objectives.map((objective, index) => (
                <div key={index}>
                  <input
                    type='text'
                    value={objective.name}
                    onChange={(e) => {
                      const newObjectives = [...objectives];
                      newObjectives[index].name = e.target.value;
                      setObjectives(newObjectives);
                    }}
                  />
                </div>
              ))}
              <div>
                <input
                  type='text'
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                />
                <button type='button' onClick={addObjective}>
                  Agregar Objetivo
                </button>
              </div>
            </div>
            <button type='submit' className='btn btn-secondary'>
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
