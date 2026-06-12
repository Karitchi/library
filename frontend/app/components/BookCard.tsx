// This is a reusable component
interface BookCardProps {
  title: string
  author: string
}

export function BookCard({ title, author }: BookCardProps) {
  return (
    <div className="bg-black rounded-xl h-48 text-white flex flex-col justify-end p-4">
      <h3>{title}</h3>
      <p>by {author}</p>
    </div >
  )
}
