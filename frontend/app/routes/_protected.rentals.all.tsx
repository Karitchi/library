import { useState } from "react";
import type { Route } from "./+types/_protected.rentals.all";
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
  const response = await fetch('http://localhost:8080/api/rentals/all', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch all rentals: ${response.status}`);
  }

  return { rentals: await response.json() as Rental[] };
}

export function HydrateFallback() {
  return <div>Loading all rentals...</div>;
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
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">All Rentals</h1>

      {rentals.length === 0 ? (
        <p className="text-gray-500">No rentals yet.</p>
      ) : (
        <div className="space-y-4">
          {rentals.map((rental: Rental) => (
            <div key={rental.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
              <div>
                <Link to={`/books/${rental.bookId}`} className="text-lg font-semibold text-blue-600 hover:underline">
                  {rental.bookTitle}
                </Link>
                <p className="text-sm text-gray-600">{rental.bookAuthor}</p>
                <p className="text-xs text-gray-500">by {rental.userEmail}</p>
              </div>
              <div className="text-right text-sm">
                <p>Due: {rental.dueDate}</p>
                <p className={rental.status === "active" ? "text-green-600" : "text-gray-500"}>
                  {rental.status}
                </p>
                {rental.status === "active" && (
                  <button onClick={() => handleReturn(rental.id)} className="mt-2 bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 cursor-pointer">
                    Return
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
