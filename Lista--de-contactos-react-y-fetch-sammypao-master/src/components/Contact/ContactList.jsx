import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../../hooks/useGlobalReducer';
import ContactCard from './ContactCard';
import * as contactServices from '../../services/contactServices';

const ContactList = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  
  const loadContacts = async () => {
    const data = await contactServices.getContacts();
    if (data) {
      dispatch({ type: 'set_contacts', payload: data.contacts });
    }
  };

  const handleDeleteContact = async (id) => {
    const success = await contactServices.deleteContact(id);
    if (success) {
      dispatch({ type: 'delete_contact', payload: id });
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row mb-3">
        <div className="col text-end">
          <button 
            className="btn btn-success fw-bold"
            onClick={() => navigate('/add-contact')}
          >
             Añadir nuevo contacto
          </button>
        </div>
      </div>

      <div className="card border shadow-sm">
        <ul className="list-group list-group-flush">
          {store.contacts && store.contacts.length > 0 ? (
            store.contacts.map((contact) => (
              <ContactCard 
                key={contact.id} 
                contact={contact} 
                onDelete={handleDeleteContact}
              />
            ))
          ) : (
            <li className="list-group-item p-4 text-center">
              No se encontraron contactos. Haz clic en "Añadir nuevo contacto" para crear uno.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ContactList;
