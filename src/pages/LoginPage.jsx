import { useState } from "react";
import supabase from "../lib/supabase";
import { Button } from "@/components/ui/button";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });
    setError(error?.message ?? null);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">ツミゲ</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="メールアドレス"
            className="border rounded px-3 py-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワード"
            className="border rounded px-3 py-2"
          />
          <Button type="submit">{isSignUp ? "新規登録" : "ログイン"}</Button>
        </form>
        <Button
          variant="ghost"
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full text-sm text-gray-500"
        >
          {isSignUp ? "ログインはこちら" : "新規登録はこちら"}
        </Button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
