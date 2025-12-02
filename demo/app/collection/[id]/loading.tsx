export default function CollectionLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 py-8 space-y-6 animate-pulse">
        <div className="h-8 bg-muted rounded-lg w-3/4" />
        <div className="aspect-[16/9] bg-muted rounded-2xl" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-2/3" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="aspect-[3/4] bg-muted rounded-lg" />
              <div className="h-4 bg-muted rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
