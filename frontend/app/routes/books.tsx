import type { Route } from "./+types/books";
import { BookCard } from "../components/BookCard";
import { useState, useEffect } from "react";

// Client-only data loader
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  // Fetch from your API endpoint
  const response = await fetch('http://localhost:8080/api/books');
  const result = await response.json();

  console.log(result)

  return { books: result.data };  // Extract and rename
}

// Optional: Show loading UI while clientLoader runs
export function HydrateFallback() {
  return <div>Loading books...</div>;
}

// Component receives data from clientLoader
export default function Books({ loaderData }: Route.ComponentProps) {
  const { books } = loaderData;  // books is the actual array

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
        />
      ))}
    </div>
  );
}
