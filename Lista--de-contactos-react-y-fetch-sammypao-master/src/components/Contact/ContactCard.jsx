import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ContactCard = ({ contact, onDelete }) => {
  const navigate = useNavigate();

  return (
    <li className="list-group-item p-4">
      <div className="row align-items-center">
        <div className="col-12 col-md-2 text-center">
          <img 
            src={contact.image || "https://i.pravatar.cc/150?img=11"} 
            alt={contact.name} 
            className="rounded-circle img-fluid border border-3 border-white shadow-sm"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        </div>

        <div className="col-12 col-md-8 mt-3 mt-md-0">
          <h4 className="mb-2">{contact.name}</h4>
          
          <div className="text-secondary small">
            <div className="d-flex align-items-center mb-1">
              <FaMapMarkerAlt className="me-3 text-secondary" />
              <span>{contact.address}</span>
            </div>
            <div className="d-flex align-items-center mb-1">
              <FaPhone className="me-3 text-secondary" />
              <span>{contact.phone}</span>
            </div>
            <div className="d-flex align-items-center">
              <FaEnvelope className="me-3 text-secondary" />
              <span>{contact.email}</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-2 text-md-end mt-3 mt-md-0">
          <button 
            className="btn btn-link text-dark p-0 me-3" 
            title="Editar contacto"
            onClick={() => navigate(`/edit-contact/${contact.id}`)}
          >
            <FaPencilAlt size={18} />
          </button>

          <button 
            className="btn btn-link text-dark p-0" 
            title="Eliminar contacto"
            onClick={() => onDelete(contact.id)}
          >
            <FaTrash size={18} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default ContactCard;
