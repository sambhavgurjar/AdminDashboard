

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-7xl font-bold text-gray-800 mb-4">404</h1>

      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2 text-center">
        Page Not Found
      </h2>

      <p className="text-gray-500 text-center mb-6 max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
        Please check the URL or go back to the homepage.
      </p>

     
    </div>
  );
}
