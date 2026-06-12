import { BookCard } from '../components/BookCard'  // Import component

function Books() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      <BookCard
        title={"titre"}
        author={"autheur"}
      />
      <BookCard
        title={"titre"}
        author={"autheur"}
      />
      <BookCard
        title={"titre"}
        author={"autheur"}
      />
      <BookCard
        title={"titre"}
        author={"autheur"}
      />
      <BookCard
        title={"titre"}
        author={"autheur"}
      />
    </div>
  )
}

export default Books
