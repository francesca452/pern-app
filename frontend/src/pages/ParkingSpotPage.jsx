import React, { useEffect } from "react";
import { useParkingSpotsData } from "../store/useParkingSpotsData";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, Trash2Icon, SaveIcon } from "lucide-react";

function ParkingSpotPage() {
  const { 
    currentSpot,
    formData,
    setFormData,
    loading,
    error,
    fetchSpot,
    updateSpot,
    deleteSpot,
  } = useParkingSpotsData();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchSpot(id)
  }, [fetchSpot, id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteSpot(id);
      navigate("/");
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{ error }</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-8 max-w-4xl">
      {/* Button to return to the HomePage,
      we navigate user back to the homepage */}
      <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to all spots
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* SPOT FORM */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Edit spot</h2>

            <form onSubmit={(e) => {
              e.preventDefault();
              updateSpot(id);
            }}
              className="space-y-6"
            >
              {/* SPOT STREET */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Spot street</span>
                </label>
                <input 
                  type="text"
                  placeholder="Enter spot street"
                  className="input input-bordered w-full"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                />
              </div>

              {/* FORM TOT_AVAILABLE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Number of free slots</span>
                </label>
                <input 
                  type="number"
                  min={0}
                  step={1}
                  placeholder="0"
                  className="input input-bordered w-full"
                  value={formData.tot_available}
                  onChange={(e) => setFormData({ ...formData, tot_available: e.target.value })} 
                />
              </div>

              {/* FORM ACTIONS */}
              <div className="flex justify-between mt-8">
                <button type="button" onClick={handleDelete} className="btn btn-error">
                  <Trash2Icon className="size-4 mr-2" />
                  Delete Spot
                </button>

                <button 
                  type="submit"
                  className="btn btn-primary"
                  disabled={ loading || !formData.street || !formData.tot_available }
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <SaveIcon className="size-4 mr-2" />
                      Save changes
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ParkingSpotPage;