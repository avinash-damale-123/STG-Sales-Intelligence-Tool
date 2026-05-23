export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">
          STG-Sales Intelligence
        </h1>

        <p className="mt-4 text-gray-600">
          Enterprise-grade sales intelligence platform with branch-secured analytics.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold">ERV Portfolio</h2>
            <p className="mt-2 text-sm text-gray-500">Coming Soon</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold">NCA Pipeline</h2>
            <p className="mt-2 text-sm text-gray-500">Coming Soon</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold">Meetings</h2>
            <p className="mt-2 text-sm text-gray-500">Coming Soon</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold">Alerts</h2>
            <p className="mt-2 text-sm text-gray-500">Coming Soon</p>
          </div>
        </div>
      </div>
    </main>
  );
}
