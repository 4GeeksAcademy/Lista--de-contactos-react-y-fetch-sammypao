import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import ContactList from "./components/Contact/ContactList";
import AddContact from "./components/AddContact/AddContact";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>¡No encontrado!</h1>} >
        <Route path="/" element={<ContactList />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/edit-contact/:id" element={<AddContact />} />
      </Route>
    )
);