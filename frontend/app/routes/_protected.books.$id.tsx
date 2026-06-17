import type { Route } from "./+types/_protected.books.$id";
import { BookCard } from "../components/BookCard";
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
    <div className="space-y-5">
      <BookCard
        title={book.title}
        author={book.author}
      />
      <div>
        <h3 className="text-md">Résumé</h3>
        <p className="">{book.summary || "No summary available"}</p>
      </div>

      <div>
        <h3 className="text-md">Date de publication</h3>
        <p>{book.publicationDate || "Unknown"}</p>
      </div>
      <div>
        <h3 className="text-md">Available Copies</h3>
        <p>{book.availableQuantity} / {book.totalQuantity}</p>
      </div>

      {rentSuccess && (
        <div className="">
          Book rented successfully!
        </div>
      )}

      {rentError && (
        <div className="">
          {rentError}
        </div>
      )}

      <button
        onClick={handleRent}
        disabled={renting || book.availableQuantity <= 0}
        className="fixed bottom-8 right-8 z-50 bg-black text-white px-6 py-2 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {renting ? "Renting..." : book.availableQuantity <= 0 ? "Unavailable" : "Louer"}
      </button>
    </div>
  );
}
