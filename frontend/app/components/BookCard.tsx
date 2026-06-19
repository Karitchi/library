interface BookCardProps {
  title: string
  author: string
  coverImage?: string | null
  priority?: boolean
}

export function BookCard({ title, author, coverImage, priority }: BookCardProps) {
  const imgSrc = coverImage
    ? `${import.meta.env.VITE_API_URL}/covers/${coverImage}`
    : null
  const webpSrc = coverImage
    ? `${import.meta.env.VITE_API_URL}/covers/${coverImage.replace(/\.jpg$/, '.webp')}`
    : null

  return (
    <div className="bg-black h-56 text-white flex flex-col justify-end p-4 relative overflow-hidden">
      {imgSrc && webpSrc && (
        <>
          <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
          <picture>
            <source srcSet={webpSrc} type="image/webp" />
            <img
              src={imgSrc}
              alt={title}
              loading={priority ? undefined : "lazy"}
              fetchPriority={priority ? "high" : undefined}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </picture>
        </>
      )}
      <div className={`relative z-10 ${imgSrc ? 'bg-black/70 p-2' : ''}`}>
        <h3 className="text-sm leading-tight">{title}</h3>
        <p className="text-xs opacity-80">par {author}</p>
      </div>
    </div>
  )
}
