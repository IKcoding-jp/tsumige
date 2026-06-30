import { useState } from "react";
import supabase from "../lib/supabase";

const ERROR_MESSAGES = {
  "Invalid login credentials": "メールアドレスまたはパスワードが違います",
  "User already registered": "このメールアドレスはすでに登録されています",
  "Email not confirmed": "メールアドレスの確認が完了していません",
  "Password should be at least 6 characters":
    "パスワードは６文字以上で入力してください",
  "Unable to validate email address: invalid format":
    "メールアドレスの形式が正しくありません",
};

function toJapanese(message) {
  return (
    ERROR_MESSAGES[message] ?? "エラーが発生しました。もう一度お試しください"
  );
}

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function login(email, password) {
    if (!email || !password) {
      setError("メールとパスワードを入力してください。");
      return;
    }
    setIsLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(toJapanese(error.message));
    setIsLoading(false);
  }

  async function signUp(email, password) {
    setIsLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(toJapanese(error.message));
    setIsLoading(false);
  }
  return { isLoading, error, login, signUp };
}
