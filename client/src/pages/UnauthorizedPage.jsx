import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-7xl font-bold text-red-500 mb-4">403</h1>

      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2 text-center">
        Unauthorized Access
      </h2>

      <p className="text-gray-600 text-center mb-6 max-w-md">
        Sorry, you don’t have permission to view this page. Please check your
        account role or contact the administrator.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition w-full sm:w-auto text-center"
        >
          Go Home
        </Link>
        <Link
          to="/login"
          className="px-6 py-2 rounded-lg border border-gray-400 text-gray-700 font-medium hover:bg-gray-200 transition w-full sm:w-auto text-center"
        >
          Login Again
        </Link>
      </div>
    </div>
  );
}
