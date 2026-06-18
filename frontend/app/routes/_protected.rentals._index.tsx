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
      <h1 className="text-lg underline mb-6">Mes locations</h1>

      {rentals.length === 0 ? (
        <p>Aucune location pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {rentals.map((rental: Rental) => (
            <Link key={rental.id} to={`/books/${rental.bookId}`} className="bg-black p-4 flex justify-between items-center no-underline text-white hover:bg-white hover:text-black border border-transparent hover:border-black">
              <div>
                <p className="text-lg">{rental.bookTitle}</p>
                <p className="text-sm text-gray-400">{rental.bookAuthor}</p>
              </div>
              <div className="text-right text-sm">
                <p>Échéance : {rental.dueDate}</p>
                <p className={rental.status === "active" ? "" : "text-gray-400"}>
                  {rental.status === "active" ? "Actif" : "Retourné"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
