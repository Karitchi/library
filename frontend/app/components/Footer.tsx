export function Footer() {
  return (
    <div className="bg-black text-white py-6 px-4 mt-12 text-xs text-center">
      <p className="mb-1">
        Librarian — Application de gestion de bibliothèque
      </p>
      <p className="mb-2">
        Gérez vos livres, auteurs et prêts en toute simplicité
      </p>
      <a
        href="https://github.com/Karitchi/librarian"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-gray-300"
      >
        GitHub
      </a>
    </div>
  );
}
