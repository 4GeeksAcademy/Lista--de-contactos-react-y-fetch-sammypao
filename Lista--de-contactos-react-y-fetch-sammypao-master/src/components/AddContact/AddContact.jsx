import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import useGlobalReducer from '../../hooks/useGlobalReducer';
import * as contactServices from '../../services/contactServices';

const AddContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && store.contacts.length > 0) {
      const contactToEdit = store.contacts.find(c => c.id === parseInt(id));
      if (contactToEdit) {
        setContact({
          name: contactToEdit.name,
          email: contactToEdit.email,
          phone: contactToEdit.phone,
          address: contactToEdit.address
        });
      }
    }
  }, [id, store.contacts]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let data;
    if (id) {
      data = await contactServices.updateContact(id, contact);
    } else {
      data = await contactServices.addContact(contact);
    }

    if (data) {
      if (id) {
        dispatch({ type: 'update_contact', payload: data });
      } else {
        dispatch({ type: 'add_contact', payload: data });
      }
      navigate('/');
    } else {
      alert("Ocurrió un error. Por favor, inténtalo de nuevo.");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0">
        <div className="card-body p-5">
          <h1 className="text-center mb-4">{id ? 'Actualizar Contacto' : 'Añadir nuevo contacto'}</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre Completo</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Nombre Completo"
                value={contact.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Tu email"
                value={contact.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Tu teléfono"
                value={contact.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">Dirección</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="Tu dirección"
                value={contact.address}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-bold py-2 mb-3" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
            
            <Link to="/" className="d-block text-center mt-3 text-secondary text-decoration-none">
              o volver a contactos
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
