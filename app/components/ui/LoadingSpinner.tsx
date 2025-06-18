export default function LoadingSpinner() {
  return (
    <div className="inline-flex items-center">
      <div className="w-4 h-4 border-2 border-t-2 border-white rounded-full animate-spin mr-2" />
      Loading...
    </div>
  )
}