export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <p className="mt-2 text-gray-600">
          Manage users, branch access, audit logs, sessions, and refresh history.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Users', 'Branch Access', 'Audit Logs', 'Refresh History'].map((item) => (
            <div key={item} className="bg-white rounded-2xl shadow p-6">
              <h2 className="font-semibold text-lg">{item}</h2>
              <p className="text-sm text-gray-500 mt-2">Coming Soon</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
