import React from "react";
import { useParkingSpotsData } from "../store/useParkingSpotsData";
import { Package2Icon, ParkingSquareIcon, PlusCircleIcon } from "lucide-react";

function AddSpotModal() {
    const { addSpot, formData, setFormData, loading } = useParkingSpotsData();

    return (
        <dialog id="add_spot_modal" className="modal">
            <div className="modal-box">
                {/* CLOSE BUTTON */}
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>
                </form>

                {/* MODAL HEADER */}
                <h3 className="font-bold text-xl mb-8">Add new spot</h3>
                
                <form onSubmit={addSpot} className="space-y-6">
                    <div className="grid gap-6">
                        {/* SPOT STREET INPUT */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium">Street name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                    <Package2Icon className="size-5" />
                                </div>
                                <input 
                                    type="text"
                                    placeholder="Enter spot street name"
                                    className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200" 
                                    value={ formData.street }
                                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* SPOT TOT_AVAILABLE */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium">Number of free slots</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                    <ParkingSquareIcon className="size-5" />
                                </div>
                                <input 
                                    type="number"
                                    min={0}
                                    step={1}
                                    placeholder="0"
                                    className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                                    value={formData.tot_available}
                                    onChange={(e) => setFormData({ ...formData, tot_available: e.target.value })} 
                                />
                            </div>
                        </div>
                    </div>

                    {/* MODAL ACTIONS */}
                    <div className="modal-actions">
                        <button 
                            className="btn btn-ghost mr-3"
                            onClick={() => setFormData({ street:"", tot_available:0 })}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary min-w-[120px]"
                            disabled={!formData.street || !formData.tot_available || loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm" />
                            ) : (
                                <>
                                    <PlusCircleIcon className="size-5 mr-2" />
                                    Add spot
                                </>
                            )}
                        </button>
                    </div>
                </form>
            
            </div>

            {/* BACKDROP */}
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>

        </dialog>
    )
}

export default AddSpotModal;