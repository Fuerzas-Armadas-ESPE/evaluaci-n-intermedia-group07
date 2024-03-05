import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

const Show = () => {
  const [themes, setThemes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [sortBy, setSortBy] = useState(null);

  const themesCollection = collection(db, 'themes');

  const getThemes = async () => {
    const data = await getDocs(themesCollection);
    setThemes(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const deleteTheme = async id => {
    const themeDoc = doc(db, 'themes', id);
    await deleteDoc(themeDoc);
    getThemes();
  };

  const confirmDeleteTheme = id => {
    MySwal.fire({
      title: '¿Eliminar el tema?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo'
    }).then(result => {
      if (result.isConfirmed) {
        deleteTheme(id);
        Swal.fire(
          '¡Eliminado!',
          '¡Tu tema ha sido eliminado!',
          'success'
        );
      }
    });
  };

  const addActivity = async (themeId, activity) => {
    const themeDoc = doc(db, 'themes', themeId);
    await addDoc(collection(themeDoc, 'activities'), activity);
    getThemes();
  };

  useEffect(() => {
    getThemes();
  }, []);

  // Resto del código (handleLogout, downloadPDF, etc.) sin cambios

  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>Registro Actividades Docentes</h1>
      {/* Resto del código sin cambios */}
      
      <h2>Docente: {user && user.email}</h2>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className="d-grid gap-2">
              {/* Botón para crear tema */}
              <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Crear Tema</Link>
              <input
                type="text"
                placeholder="Buscar tema..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='form-control mt-2 mb-2'
              />
              {/* Resto del código sin cambios */}
            </div>
            <div id="pdf-content">
              {/* Tabla para mostrar temas */}
              <table className='table table-striped table-light table-hover'>
                <thead>
                  <tr>
                    <th>
                      {/* Botón para ordenar por descripción */}
                      <button onClick={() => setSortBy('description')} >Descripción</button>
                    </th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {themes.map(theme => (
                    <tr key={theme.id}>
                      <td>{theme.description}</td>
                      <td>
                        {/* Botón para editar tema */}
                        <Link to={`/edit/${theme.id}`} className="btn btn-dark"><i className="fa-solid fa-pencil"></i></Link>
                        {/* Botón para eliminar tema */}
                        <button onClick={() => { confirmDeleteTheme(theme.id) }} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                        {/* Formulario para agregar actividad */}
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          const { activityName, status } = e.target.elements;
                          const activity = {
                            name: activityName.value,
                            status: status.checked ? 1 : 0 // 1 para realizada, 0 para pendiente
                          };
                          addActivity(theme.id, activity);
                        }}>
                          <input type="text" name="activityName" placeholder="Nombre de la actividad" required />
                          <label>
                            <input type="checkbox" name="status" />
                            Realizada
                          </label>
                          <button type="submit">Agregar Actividad</button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;
