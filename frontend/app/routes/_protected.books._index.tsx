import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router";
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

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const sentinelRef = useRef<HTMLDivElement>(null);

  const fetchBooks = useCallback(async (pageNum: number, searchQuery: string, replace: boolean) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams({ page: String(pageNum), size: "20" });
      if (searchQuery) params.set("search", searchQuery);

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
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    setPage(0);
    fetchBooks(0, search, true);
  }, [search, fetchBooks]);

  useEffect(() => {
    if (page === 0) return;
    fetchBooks(page, search, false);
  }, [page, search, fetchBooks]);

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
    const timer = setTimeout(() => setSearch(searchInput), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

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
            onClick={() => { setSearchInput(""); setSearch(""); }}
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

      {initialLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-neutral-800 h-56 animate-pulse" />
          ))}
        </div>
      ) : books.length === 0 ? (
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

      {loading && !initialLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="bg-neutral-800 h-56 animate-pulse" />
          ))}
        </div>
      )}
    </div>
  );
}
