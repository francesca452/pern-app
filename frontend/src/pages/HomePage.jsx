import React from "react";
import { useEffect } from "react";
import { useParkingSpotsData } from "../store/useParkingSpotsData";
import { PlusCircleIcon, RefreshCwIcon, PackageIcon } from "lucide-react";
import SpotCard from "../components/SpotCard.jsx";

function HomePage() {
  const { spots, loading, error, fetchSpots } = useParkingSpotsData(); 

  useEffect(() => {
    fetchSpots()
  }, [fetchSpots]);

  console.log("spots:", spots);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">

        <button className="btn btn-primary ">
          <PlusCircleIcon className="size-5 mr-2" />
          Add spot
        </button>

        <button className="btn btn-ghost btn-circle" onClick={ fetchSpots }>
          <RefreshCwIcon className="size-5" />
        </button>

      </div>

      {error && <div className="alert alert-error mb-8">{ error }</div>}

      {spots.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold">No spots found</h3>
            <p className="text-gray-500 max-w-sm">
              Get started by adding first spots to the inventory
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spots.map(spot => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
        </div>
      )}

    </main>
  );
}

export default HomePage;