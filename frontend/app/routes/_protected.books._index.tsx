import type { Route } from "./+types/_protected.books._index";
import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useSearchParams } from "react-router";
import { BookCard } from "../components/BookCard";

interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string | null;
}

interface BookPage {
  content: Book[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
}

let pageCache: { data: BookPage; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000;

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search") || "";
  const token = localStorage.getItem("token");
  const params = new URLSearchParams({ page: "0", size: "20" });
  if (search) params.set("search", search);

  if (!search && pageCache && Date.now() - pageCache.timestamp < CACHE_TTL) {
    return pageCache.data;
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error(`Erreur ${response.status}`);

  const data: BookPage = await response.json();

  if (!search) pageCache = { data, timestamp: Date.now() };

  return data;
}

export function HydrateFallback() {
  return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="bg-neutral-800 h-56 animate-pulse" />
    ))}
  </div>;
}

export default function Books({ loaderData }: Route.ComponentProps) {
  const initialPage = loaderData as BookPage;

  const [books, setBooks] = useState<Book[]>(initialPage.content);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(initialPage.currentPage + 1 < initialPage.totalPages);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearch = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(currentSearch);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setBooks(initialPage.content);
    setPage(0);
    setHasMore(initialPage.currentPage + 1 < initialPage.totalPages);
  }, [initialPage]);

  const fetchBooks = useCallback(async (pageNum: number, replace: boolean) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams({ page: String(pageNum), size: "20" });
      if (currentSearch) params.set("search", currentSearch);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(`Erreur ${response.status}`);

      const data: BookPage = await response.json();
      setBooks((prev) => (replace ? data.content : [...prev, ...data.content]));
      setHasMore(pageNum + 1 < data.totalPages);
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [currentSearch]);

  useEffect(() => {
    if (page === 0) return;
    fetchBooks(page, false);
  }, [page, fetchBooks]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);
    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [hasMore, loading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput) {
        setSearchParams({ search: searchInput });
      } else {
        setSearchParams({});
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, setSearchParams]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Rechercher par titre ou auteur..."
          className="w-full bg-black text-white border border-white px-4 py-2 outline-none placeholder:text-neutral-400"
        />
        {searchInput ? (
          <button
            onClick={() => { setSearchInput(""); setSearchParams({}); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 hover:text-white cursor-pointer"
            aria-label="Effacer la recherche"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : (
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
      </div>

      {books.length === 0 ? (
        <p className="text-neutral-400 text-center py-12">Aucun livre trouvé</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book, i) => (
            <Link
              key={book.id}
              to={`/books/${book.id}`}
              className="text-inherit no-underline"
            >
              <BookCard
                title={book.title}
                author={book.author}
                coverImage={book.coverImage}
                priority={i === 0}
              />
            </Link>
          ))}
        </div>
      )}

      <div ref={sentinelRef} className="h-4" />

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="bg-neutral-800 h-56 animate-pulse" />
          ))}
        </div>
      )}
    </div>
  );
}
