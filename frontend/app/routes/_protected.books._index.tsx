import type { Route } from "./+types/_protected.books._index";
import { BookCard } from "../components/BookCard";
import { Link } from "react-router";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`Échec du chargement des livres : ${response.status}`);
  }

  return { books: await response.json() };
}

export function HydrateFallback() {
  return <div>Chargement...</div>;
}

export default function Books({ loaderData }: Route.ComponentProps) {
  const { books } = loaderData;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book) => (
        <Link
          key={book.id}
          to={`/books/${book.id}`}
          className="text-inherit no-underline"
        >
          <BookCard
            title={book.title}
            author={book.author}
          />
        </Link>
      ))}
    </div>
  );
}
