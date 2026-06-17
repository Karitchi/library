import type { Route } from "./+types/book.$id";
import { useState } from "react";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { id } = params;
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:8080/api/books/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Book not found");
  }

  return { book: await response.json() };
}

export function HydrateFallback() {
  return <div>Loading book details...</div>;
}

export default function BookDetail({ loaderData }: Route.ComponentProps) {
  const { book } = loaderData;
  const [renting, setRenting] = useState(false);
  const [rentError, setRentError] = useState("");
  const [rentSuccess, setRentSuccess] = useState(false);

  if (!book) {
    return <div>Book not found</div>;
  }

  const handleRent = async () => {
    setRenting(true);
    setRentError("");
    setRentSuccess(false);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:8080/api/rentals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ bookId: book.id }),
      });

      if (response.ok) {
        setRentSuccess(true);
      } else {
        const data = await response.json();
        setRentError(data.error || "Failed to rent book");
      }
    } catch (err) {
      setRentError("Cannot connect to server");
    } finally {
      setRenting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
        <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="text-gray-700">{book.summary || "No summary available"}</p>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Publication Date</h3>
              <p>{book.publicationDate || "Unknown"}</p>
            </div>
            <div>
              <h3 className="font-semibold">Available Copies</h3>
              <p>{book.availableQuantity} / {book.totalQuantity}</p>
            </div>
          </div>

          {rentSuccess && (
            <div className="mt-4 bg-green-100 text-green-700 p-2 rounded text-sm">
              Book rented successfully!
            </div>
          )}

          {rentError && (
            <div className="mt-4 bg-red-100 text-red-700 p-2 rounded text-sm">
              {rentError}
            </div>
          )}

          <button
            onClick={handleRent}
            disabled={renting || book.availableQuantity <= 0}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {renting ? "Renting..." : book.availableQuantity <= 0 ? "Unavailable" : "Rent This Book"}
          </button>
        </div>
      </div>
    </div>
  );
}
