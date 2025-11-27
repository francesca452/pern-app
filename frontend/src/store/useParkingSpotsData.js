import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000";

export const useParkingSpotsData = create((set, get) => ({
    spots: [],
    loading: false,
    error: null,
    
    formData: {
        street:"",
        tot_available:0
    },
    
    setFormData: (formData) => set({ formData }),
    resetForm: () => set({ formData: { street:"", tot_available:0 } }),

    currentSpot: null,

    fetchSpots: async () => {
        set({ loading: true }); 
    
        try {
            const response = await axios.get(`${BASE_URL}/api/parkingSpots/`) // We want to send a get request with the help of axios
            set({ spots: response.data.data, error: null });
            
        } catch (err) {
            if(err.status === 429) set({ error: "Rate limit exceeded", spots: [] });
            else set({ error: "Something went wrong", spots: [] });
        
        } finally { 
            set({ loading: false });
        }
    },

    deleteSpot: async (id) => {
        set({ loading: true });

        try {
            await axios.delete(`${BASE_URL}/api/parkingSpots/${id}`);
            set((prev) => ({ spots: prev.spots.filter(spot => spot.id !== id )}));
            toast.success("Product deleted successfully");

        } catch (err) {
            console.log("Error in deleteSpot function", err);
            toast.error("Something went wrong"); 
        
        } finally {
            set({ loading: false });
        }

    },

    addSpot: async (e) => {
        e.preventDefault();
        set({ loading: true });

        try {
            const { formData } = get();
            await axios.post(`${BASE_URL}/api/parkingSpots/`, formData); 
            await get().fetchSpots();
            get().resetForm();
            toast.success("Spot added successfully");
            document.getElementById("add_spot_modal").close();

        } catch (err) {
            console.log("Error in addSpot function", err);
            toast.err("Something went wrong");

        } finally {
            set({ loading: false });
        }
    },

    fetchSpot: async (id) => {
        set({ loading: true });
        
        try {
            const response = await axios.get(`${BASE_URL}/api/parkingSpots/${id}`);
            set({ currentSpot: response.data.data,
                formData: response.data.data,
                error: null,
             });

        } catch (err) {
            console.log("Error in fetchSpot function", err);
            set({ error: "Something went wrong", currentSpot: null });

        } finally {
            set({ loading: false });
        }
    },

    updateSpot: async(id) => {
        set({ loading: true });

        try {
            const { formData } = get();
            const response = await axios.put(`${BASE_URL}/api/parkingSpots/${id}`, formData);
            set({ currentSpot: response.data.data });
            toast.success("Spot update successfully");

        } catch (err) {
            toast.error("Something went wrong");
            console.log("Error in updateSpot function", err);

        } finally {
            set({ loading: false });
        }
    },

}));