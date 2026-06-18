import type { Route } from "./+types/_protected.rentals._index";
import { Link } from "react-router";

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
  const response = await fetch('http://localhost:8080/api/rentals', {
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

export default function Rentals({ loaderData }: Route.ComponentProps) {
  const { rentals } = loaderData;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 underline">Mes locations</h1>

      {rentals.length === 0 ? (
        <p>Aucune location pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {rentals.map((rental: Rental) => (
            <div key={rental.id} className="bg-black p-4 flex justify-between items-center">
              <div>
                <Link to={`/books/${rental.bookId}`} className="text-lg text-white border border-transparent hover:bg-white hover:text-black hover:border-black no-underline">
                  {rental.bookTitle}
                </Link>
                <p className="text-sm text-gray-400">{rental.bookAuthor}</p>
              </div>
              <div className="text-right text-sm">
                <p className="text-white">Échéance : {rental.dueDate}</p>
                <p className={rental.status === "active" ? "text-white" : "text-gray-400"}>
                  {rental.status === "active" ? "Actif" : "Retourné"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
