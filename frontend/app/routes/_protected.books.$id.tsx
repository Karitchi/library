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
    throw new Error("Livre introuvable");
  }

  return { book: await response.json() };
}

export function HydrateFallback() {
  return <div>Chargement...</div>;
}

export default function BookDetail({ loaderData }: Route.ComponentProps) {
  const [book, setBook] = useState(loaderData.book);
  const [renting, setRenting] = useState(false);
  const [rentError, setRentError] = useState("");
  const [rentSuccess, setRentSuccess] = useState(false);

  if (!book) {
    return <div>Livre introuvable</div>;
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
        setBook(prev => ({ ...prev, availableQuantity: prev.availableQuantity - 1 }));
      } else {
        const data = await response.json();
        setRentError(data.error || "Échec de l'emprunt");
      }
    } catch (err) {
      setRentError("Impossible de se connecter au serveur");
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
        <h3 className="text-lg underline">Résumé</h3>
        <p className="">{book.summary || "Aucun résumé disponible"}</p>
      </div>

      <div>
        <h3 className="text-lg underline">Date de publication</h3>
        <p>{book.publicationDate || "Inconnue"}</p>
      </div>
      <div>
        <h3 className="text-lg underline">Exemplaires disponibles</h3>
        <p>{book.availableQuantity} / {book.totalQuantity}</p>
      </div>

      {rentSuccess && (
        <div className="">
          Livre emprunté avec succès !
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
        className=" bg-black text-white px-6 py-2 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {renting ? "Emprunt en cours..." : book.availableQuantity <= 0 ? "Indisponible" : "Louer"}
      </button>
    </div>
  );
}
