import React from "react";
import { Link } from "react-router-dom";
import { EditIcon, Trash2Icon } from "lucide-react";
import { useParkingSpotsData } from "../store/useParkingSpotsData";

function SpotCard({spot}) {
    const { deleteSpot } = useParkingSpotsData();
    
    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            
            {/* SPOT IMAGE */}
            {/*
            <figure className="relative pt-[56.25%]">
                <img src={spot.image} alt={spot.street} className="absolute top-0 left-0 w-full h-full object-cover" />
            </figure>
            */}

            <div className="card-body">
                {/* SPOT INFORMATION */}
                <h2 className="card-title text-lg font-semibold">{ spot.street }</h2>
                <p className="text-2xl font-bold text-primary">{spot.tot_aviable}</p>

                {/* CARD ACTIONS:
                - Edit button: once click will take you to the spot page.
                The page will be created later
                - Delete button: we see after a toast of the state of the delete request
                */}
                <div className="card-actions justify-end mt-4">
                    <Link to={`/spot/${spot.id}`} className="btn btn-sm btn-info btn-outline">
                        <EditIcon className="size-4" />
                    </Link>

                    <button className="btn btn-sm btn-error btn-outline" onClick={() => deleteSpot(spot.id)}>
                        <Trash2Icon className="size-4" />
                    </button>

                </div>

                
            </div>
            

        </div>       
    )
}

export default SpotCard;