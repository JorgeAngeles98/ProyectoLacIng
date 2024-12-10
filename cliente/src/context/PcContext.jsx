import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';
import {createPcRequest, getPcsRequest, deletePcRequest, getPcRequest, updatePcRequest, getPcsBySalonRequest } from "../api/pc";
import { get } from "mongoose";

const PcContext = createContext();

export const usePc = () => {
    const context = useContext(PcContext);

    if (!context) {
        throw new Error('usePc debe estar dentro del proveedor PcContext');
    }
    return context;
}

export function PcProvider({children}){

    const [pcs, setPcs] = useState([]);

    const getPcs = async () => {
        try {
            const res = await getPcsRequest();
            setPcs(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const createPc = async (Pc) => {
        const res = await createPcRequest(Pc);
        console.log(res);
    }

    const deletePc = async (id) => {
        try {
            const res = await deletePcRequest(id);
            if (res.status === 204) setPcs(pcs.filter(Pc => Pc._id !== id));

        } catch (error) {
            console.error(error);
        }
    }

    const getPc = async (id) => {
        try {
            const res = await getPcRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const updatePc = async (id, Pc) => {
        try{
            await updatePcRequest(id, Pc);
        }catch(error){
            console.error(error);
        }
            
    };

    const getPcsBySalon = async (id) => {
        try {
            const res = await getPcsBySalonRequest(id);
            setPcs(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <PcContext.Provider value={{ 
            pcs, 
            getPcs, 
            createPc, 
            deletePc, 
            getPc, 
            updatePc,
            getPcsBySalon 
        }}>
            {children}
        </PcContext.Provider>
    );
}

PcProvider.propTypes = {
    children: PropTypes.node.isRequired,
}