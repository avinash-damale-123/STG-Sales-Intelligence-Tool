import { LoginForm } from '@/components/auth/LoginForm';

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

        <LoginForm />

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Contact your administrator if you cannot access your account.
          </p>
        </div>
      </div>
    </main>
  );
}
