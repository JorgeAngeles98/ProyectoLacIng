import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';
import { createSalonesRequest, getSalonesRequest, deleteSalonesRequest, getSalonRequest, updateSalonesRequest} from "../api/salones";

const SalonContext = createContext();

export const useSalon = () => {
    const context = useContext(SalonContext);

    if (!context) {
        throw new Error('useSalon debe estar dentro del proveedor SalonContext');
    }
    return context;
}

export function SalonProvider({ children }) {

    const [salones, setSalones] = useState([]);

    const getSalones = async () => {
        try {
            const res = await getSalonesRequest();
            setSalones(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const createSalon = async (salon) => {
        const res = await createSalonesRequest(salon);
        console.log(res);
    }

    const deleteSalon = async (id) => {
        try {
            const res = await deleteSalonesRequest(id);
            if (res.status === 204) setSalones(salones.filter(salon => salon._id !== id));

        } catch (error) {
            console.error(error);
        }
    }

    const getSalon = async (id) => {
        try {
            const res = await getSalonRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const actuzaliarSalon = async (id, salon) => {
        try{
            await updateSalonesRequest(id, salon);
        }catch(error){
            console.error(error);
        }
            
    }


    return (
        <SalonContext.Provider value={{
            salones,
            createSalon,
            getSalones,
            deleteSalon,
            getSalon,
            actuzaliarSalon,
        }}>
            {children}
        </SalonContext.Provider>
    );
}

SalonProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

