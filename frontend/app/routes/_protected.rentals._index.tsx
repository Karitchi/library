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
    throw new Error(`Failed to fetch rentals: ${response.status}`);
  }

  return { rentals: await response.json() as Rental[] };
}

export function HydrateFallback() {
  return <div>Loading rentals...</div>;
}

export default function Rentals({ loaderData }: Route.ComponentProps) {
  const { rentals } = loaderData;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Rentals</h1>

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
              </div>
              <div className="text-right text-sm">
                <p>Due: {rental.dueDate}</p>
                <p className={rental.status === "active" ? "text-green-600" : "text-gray-500"}>
                  {rental.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
