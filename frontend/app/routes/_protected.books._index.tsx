import type { Route } from "./+types/_protected.books._index";
import { BookCard } from "../components/BookCard";
import { Link } from "react-router";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8080/api/books', {
    headers: {
      'Authorization': `Bearer ${token}`  // Add the token here
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.status}`);
  }

  return { books: await response.json() };
}

// Optional: Show loading UI while clientLoader runs
export function HydrateFallback() {
  return <div>Loading books...</div>;
}

// Component receives data from clientLoader
export default function Books({ loaderData }: Route.ComponentProps) {
  const { books } = loaderData;  // books is the actual array

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book) => (
        <Link
          key={book.id}
          to={`/books/${book.id}`}  // Navigate to /books/1, /books/2, etc.
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
