export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            STG-Sales Intelligence
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Secure branch-scoped sales intelligence platform.
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User ID or Email
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter User ID or Email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-black px-4 py-3 text-white font-medium hover:opacity-90"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </button>
        </div>
      </div>
    </main>
  );
}
