import type { Route } from "./+types/book.$id";
import { useParams } from "react-router";
import { useState, useEffect } from "react";

// Loader for individual book
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { id } = params;
  const token = localStorage.getItem('token'); // Get the stored token
  const response = await fetch(`http://localhost:8080/api/books/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`  // Add the token here
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

  if (!book) {
    return <div>Book not found</div>;
  }

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

          <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
            Rent This Book
          </button>
        </div>
      </div>
    </div>
  );
}
