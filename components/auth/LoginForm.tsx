'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

const allowedDomains = ['satgurutravel.com', 'satguruai.com'];

function isAllowedEmail(value: string) {
  const email = value.trim().toLowerCase();
  return allowedDomains.some((domain) => email.endsWith(`@${domain}`));
}

export function LoginForm() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [secret, setSecret] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');

    if (!isAllowedEmail(identifier)) {
      setMessage('Only approved domains can access this portal: satgurutravel.com and satguruai.com.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: identifier, password: secret })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setMessage(result.message || 'Unable to sign in.');
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch {
      setMessage('Unable to connect to the server.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function showPendingFeature(feature: string) {
    setMessage(`${feature} will be connected in the next authentication phase.`);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <button className="rounded-2xl bg-slate-950 px-4 py-3 text-left text-white shadow-sm" type="button">
          <span className="block text-sm font-bold">Login</span>
          <span className="mt-1 block text-xs text-slate-300">Use credentials</span>
        </button>
        <button className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm hover:border-emerald-400" onClick={() => showPendingFeature('Google login')} type="button">
          <span className="flex items-center gap-2 text-sm font-bold text-slate-950"><span className="grid h-6 w-6 place-items-center rounded-full border text-sm font-black text-blue-600">G</span>Google</span>
          <span className="mt-1 block text-xs text-slate-500">Approved domains</span>
        </button>
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <label className="block text-xs font-bold text-slate-700">
          Username / Email ID
          <span className="ml-2 rounded-full border border-slate-300 px-1.5 text-[10px] text-slate-500" title="Enter your official company email ID.">i</span>
          <input
            type="email"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="name@satgurutravel.com"
            autoComplete="username"
            required
          />
        </label>

        <label className="block text-xs font-bold text-slate-700">
          <span className="flex items-center justify-between">
            Password
            <Link className="text-[11px] font-bold text-emerald-700 hover:underline" href="/forgot-password">
              Forgot password?
            </Link>
          </span>
          <div className="relative mt-1">
            <input
              type={showPassword ? 'text' : 'password'}
              value={secret}
              onChange={(event) => setSecret(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500" onClick={() => setShowPassword((value) => !value)} type="button">
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </label>

        {message ? <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{message}</div> : null}

        <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/10 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? 'Signing in...' : 'Login'}
        </button>
      </form>

      <div className="flex items-center gap-3 text-[11px] text-slate-400"><span className="h-px flex-1 bg-slate-200" />New user access<span className="h-px flex-1 bg-slate-200" /></div>

      <div className="grid grid-cols-2 gap-3">
        <button className="rounded-full border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 hover:border-emerald-500" onClick={() => showPendingFeature('Signup form')} type="button">
          Sign up with form
        </button>
        <button className="rounded-full border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 hover:border-emerald-500" onClick={() => showPendingFeature('Google signup')} type="button">
          <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs font-black text-blue-600">G</span>
          Sign up with Google
        </button>
      </div>

      <a className="block rounded-xl border border-dashed border-slate-300 px-4 py-2.5 text-center text-xs font-bold text-slate-700 hover:border-amber-400 hover:bg-amber-50" href="/contact">
        Need help? Contact administrator
      </a>
    </div>
  );
}
