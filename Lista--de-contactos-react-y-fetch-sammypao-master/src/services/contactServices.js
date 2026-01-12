const SLUG = "sammypao";
const BASE_URL = `https://playground.4geeks.com/contact/agendas/${SLUG}`;
const API_URL = `${BASE_URL}/contacts`;

export const getContacts = async () => {
    try {
        const response = await fetch(API_URL);
        if (response.ok) {
            return await response.json();
        } else if (response.status === 404) {
            const created = await createAgenda();
            if (created) return getContacts();
        }
        return null;
    } catch (error) {
        console.error("Error en getContacts:", error);
        return null;
    }
};

export const createAgenda = async () => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST'
        });
        return response.ok;
    } catch (error) {
        console.error("Error en createAgenda:", error);
        return false;
    }
};

export const addContact = async (contact) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contact)
        });
        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.error("Error en addContact:", error);
        return null;
    }
};

export const updateContact = async (id, contact) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contact)
        });
        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.error("Error en updateContact:", error);
        return null;
    }
};

export const deleteContact = async (id) => {
    try {
        console.log(`Intentando eliminar contacto con ID: ${id}`);
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok || response.status === 204) {
            console.log(`Contacto ${id} eliminado con éxito.`);
            return true;
        } else {
            console.error(`Fallo al eliminar contacto. Status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error("Error en deleteContact:", error);
        return false;
    }
};
