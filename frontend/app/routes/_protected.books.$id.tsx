import type { Route } from "./+types/_protected.books.$id";
import { BookCard } from "../components/BookCard";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

interface Book {
  id: number;
  title: string;
  author: string;
  summary: string;
  publicationDate: string;
  totalQuantity: number;
  availableQuantity: number;
  coverImage: string | null;
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { id } = params;
  const token = localStorage.getItem('token');
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Livre introuvable");
  }

  return { book: (await response.json()) as Book };
}

export function HydrateFallback() {
  return <div>Chargement...</div>;
}

export default function BookDetail({ loaderData }: Route.ComponentProps) {
  const [book, setBook] = useState(loaderData.book);
  const [renting, setRenting] = useState(false);

  if (!book) {
    return <div>Livre introuvable</div>;
  }

  const handleRent = async () => {
    setRenting(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/rentals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ bookId: book.id }),
      });

      if (response.ok) {
        toast.success("Livre emprunté avec succès !");
        setBook(prev => ({ ...prev, availableQuantity: prev.availableQuantity - 1 }));
      } else {
        const data = await response.json();
        toast.error(data.error || "Échec de l'emprunt");
      }
    } catch (err) {
      toast.error("Impossible de se connecter au serveur");
    } finally {
      setRenting(false);
    }
  };

  return (
    <div className="space-y-5">
      <Link to="/books" className="inline-flex items-center gap-1 bg-black text-white border border-transparent px-4 py-2 no-underline hover:bg-white hover:text-black hover:border-black">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Retour aux livres
      </Link>
      <BookCard
        title={book.title}
        author={book.author}
        coverImage={book.coverImage}
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

      <button
        onClick={handleRent}
        disabled={renting || book.availableQuantity <= 0}
        className=" bg-black text-white border border-transparent px-6 py-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:text-black hover:border-black"
      >
        {renting ? "Emprunt en cours..." : book.availableQuantity <= 0 ? "Indisponible" : "Louer"}
      </button>
    </div>
  );
}
