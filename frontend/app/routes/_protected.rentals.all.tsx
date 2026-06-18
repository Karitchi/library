import { useState } from "react";
import type { Route } from "./+types/_protected.rentals.all";
import { Link } from "react-router";
import { toast } from "sonner";

interface Rental {
  id: number;
  userId: number;
  userEmail: string;
  bookId: number;
  bookTitle: string;
  bookAuthor: string;
  rentDate: string;
  dueDate: string;
  status: string;
}

export async function clientLoader() {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8080/api/rentals/all', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error(`Échec du chargement des locations : ${response.status}`);
  }

  return { rentals: await response.json() as Rental[] };
}

export function HydrateFallback() {
  return <div>Chargement...</div>;
}

export default function AllRentals({ loaderData }: Route.ComponentProps) {
  const [rentals, setRentals] = useState<Rental[]>(loaderData.rentals);

  const handleReturn = async (rentalId: number) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/rentals/${rentalId}/return`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      setRentals(prev => prev.map(r =>
        r.id === rentalId ? { ...r, status: "returned" } : r
      ));
      toast.success("Livre retourné avec succès !");
    }
  };

  return (
    <div>
      <h1 className="text-lg underline mb-6">Toutes les locations</h1>

      {rentals.length === 0 ? (
        <p>Aucune location pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {rentals.map((rental: Rental) => (
            <div key={rental.id} className="bg-black p-4 flex justify-between items-center text-white">
              <div>
                <Link to={`/books/${rental.bookId}`} className="text-lg text-white border border-transparent hover:bg-white hover:text-black hover:border-black no-underline">
                  {rental.bookTitle}
                </Link>
                <p className="text-sm text-gray-400">{rental.bookAuthor}</p>
                <p className="text-xs text-gray-500">par {rental.userEmail}</p>
              </div>
              <div className="text-right text-sm">
                <p>Échéance : {rental.dueDate}</p>
                <p className={rental.status === "active" ? "" : "text-gray-400"}>
                  {rental.status === "active" ? "Actif" : "Retourné"}
                </p>
                {rental.status === "active" && (
                  <button onClick={() => handleReturn(rental.id)} className="mt-2 bg-white text-black px-3 py-1 text-xs cursor-pointer border border-black hover:bg-black hover:text-white hover:border-white">
                    Retour
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
