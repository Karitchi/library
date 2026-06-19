interface BookCardProps {
  title: string
  author: string
  coverImage?: string | null
}

export function BookCard({ title, author, coverImage }: BookCardProps) {
  const imgSrc = coverImage
    ? `${import.meta.env.VITE_API_URL}/covers/${coverImage}`
    : null

  return (
    <div className="bg-black h-56 text-white flex flex-col justify-end p-4 relative overflow-hidden">
      {imgSrc && (
        <>
          <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
          <img
            src={imgSrc}
            alt={title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </>
      )}
      <div className={`relative z-10 ${imgSrc ? 'bg-black/70 p-2' : ''}`}>
        <h3 className="text-sm leading-tight">{title}</h3>
        <p className="text-xs opacity-80">par {author}</p>
      </div>
    </div>
  )
}
