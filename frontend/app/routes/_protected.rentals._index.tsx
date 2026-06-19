import type { Route } from "./+types/_protected.rentals._index";
import { RentalCard } from "../components/RentalCard";

interface RentalData {
  id: number;
  bookId: number;
  bookTitle: string;
  bookAuthor: string;
  dueDate: string;
  status: string;
}

export async function clientLoader() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/rentals`, {
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

export default function Rentals({ loaderData }: Route.ComponentProps) {
  const { rentals } = loaderData;

  return (
    <div>
      <h1 className="text-lg underline mb-6">Mes locations</h1>

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
              dueDate={rental.dueDate}
              status={rental.status}
            />
          ))}
        </div>
      )}
    </div>
  );
}
