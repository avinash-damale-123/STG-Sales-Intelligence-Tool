import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(20,184,166,0.35),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(246,166,35,0.32),transparent_26%),linear-gradient(135deg,#f8fafc_0%,#eef6ff_50%,#fff7ed_100%)]" />
      <div className="absolute left-[-90px] top-20 h-72 w-72 animate-pulse rounded-full bg-teal-300/35 blur-3xl" />
      <div className="absolute right-[-80px] bottom-10 h-80 w-80 animate-pulse rounded-full bg-orange-300/35 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/70 to-transparent" />

      <section className="relative mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full items-center gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="hidden lg:block">
            <div className="rounded-[2rem] border border-white/70 bg-white/45 p-7 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
              <div className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-950 text-amber-400">SA</span>
                Secure AI gateway
              </div>
              <h1 className="mt-6 text-4xl font-black leading-tight text-slate-950 xl:text-5xl">
                Protected access for Satguru AI applications.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
                Internal tools, documents, portal links and admin features are visible only after a valid login from an approved company domain.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/80 p-4 shadow-sm"><b className="text-sm text-slate-950">Domain controlled</b><p className="mt-1 text-xs text-slate-600">Current domains: satgurutravel.com and satguruai.com.</p></div>
                <div className="rounded-2xl bg-white/80 p-4 shadow-sm"><b className="text-sm text-slate-950">Role based</b><p className="mt-1 text-xs text-slate-600">Standard user, admin and super admin access.</p></div>
              </div>
            </div>
          </aside>

          <div className="mx-auto w-full max-w-[500px]">
            <div className="rounded-[2rem] border border-white/75 bg-white/92 p-5 shadow-2xl shadow-slate-900/20 backdrop-blur-xl sm:p-7">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-36 items-center justify-center rounded-2xl bg-white text-2xl font-black shadow-sm">
                  <span className="text-emerald-700">sat</span><span className="text-orange-500">guru</span>
                </div>
              </div>
              <p className="mb-5 text-center text-sm text-slate-600">
                Welcome back! Sign in to access your Satguru AI home.
              </p>

              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
