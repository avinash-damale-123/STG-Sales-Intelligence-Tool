export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Branch-secured sales intelligence overview.
            </p>
          </div>

          <div className="text-sm text-gray-500">
            Last Refresh: Coming Soon
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold">ERV Portfolio</h2>
            <p className="mt-4 text-3xl font-bold">0</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold">NCA Pipeline</h2>
            <p className="mt-4 text-3xl font-bold">0</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold">Meetings</h2>
            <p className="mt-4 text-3xl font-bold">0</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold">Alerts</h2>
            <p className="mt-4 text-3xl font-bold">0</p>
          </div>
        </div>
      </div>
    </main>
  );
}
