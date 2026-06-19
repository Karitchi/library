import { useState } from "react";
import type { Route } from "./+types/_protected.rentals.all";
import { Link } from "react-router";
import { toast } from "sonner";
import { RentalCard } from "../components/RentalCard";

interface RentalData {
  id: number;
  bookId: number;
  bookTitle: string;
  bookAuthor: string;
  userEmail: string;
  dueDate: string;
  status: string;
}

export async function clientLoader() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/rentals/all`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error(`Échec du chargement des locations : ${response.status}`);
  }

  return { rentals: await response.json() as RentalData[] };
}

export function HydrateFallback() {
  return <div>Chargement...</div>;
}

export default function AllRentals({ loaderData }: Route.ComponentProps) {
  const [rentals, setRentals] = useState<RentalData[]>(loaderData.rentals);

  const handleReturn = async (rentalId: number) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/rentals/${rentalId}/return`, {
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
      <Link to="/books" className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white no-underline mb-4">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Retour aux livres
      </Link>
      <h1 className="text-lg underline mb-6">Toutes les locations</h1>

      {rentals.length === 0 ? (
        <p>Aucune location pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {rentals.map((rental: RentalData) => (
            <RentalCard
              key={rental.id}
              id={rental.id}
              bookId={rental.bookId}
              bookTitle={rental.bookTitle}
              bookAuthor={rental.bookAuthor}
              userEmail={rental.userEmail}
              dueDate={rental.dueDate}
              status={rental.status}
              onReturn={handleReturn}
            />
          ))}
        </div>
      )}
    </div>
  );
}
