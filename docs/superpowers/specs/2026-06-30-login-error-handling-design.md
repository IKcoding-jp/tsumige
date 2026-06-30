# ログイン時エラーハンドリング整備 設計書

## 概要

ログインページのエラー表示をユーザーフレンドリーに整備する。
具体的には Supabase が返す英語のエラーメッセージを日本語に変換し、
送信中の loading 状態を制御する。

## 変更ファイル

| ファイル | 種別 | 内容 |
|---|---|---|
| `src/hooks/useAuth.js` | 新規作成 | 認証ロジックをカプセル化 |
| `src/pages/LoginPage.jsx` | 修正 | useAuth を使うように変更 |

`App.jsx` は変更しない（セッション管理はそのまま）。

## useAuth.js の設計

### インターフェース

```js
const { isLoading, error, login, signUp } = useAuth();
```

| 返り値 | 型 | 説明 |
|---|---|---|
| `isLoading` | boolean | 送信処理中フラグ |
| `error` | string \| null | 日本語変換済みエラー文字列 |
| `login(email, password)` | function | サインイン処理 |
| `signUp(email, password)` | function | 新規登録処理 |

### エラーメッセージ変換マップ

| Supabase メッセージ | 表示する日本語 |
|---|---|
| `Invalid login credentials` | メールアドレスまたはパスワードが違います |
| `User already registered` | このメールアドレスはすでに登録されています |
| `Email not confirmed` | メールアドレスの確認が完了していません |
| `Password should be at least 6 characters` | パスワードは6文字以上で入力してください |
| `Unable to validate email address: invalid format` | メールアドレスの形式が正しくありません |
| それ以外 | エラーが発生しました。もう一度お試しください |

## LoginPage.jsx の変更点

### エラー表示

```jsx
{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
```

### ボタン制御

```jsx
<Button type="submit" disabled={isLoading}>
  {isLoading ? "処理中..." : isSignUp ? "新規登録" : "ログイン"}
</Button>
```

## 既存パターンとの一貫性

`useGames.js` で確立した「UIとロジックの分離」パターンを踏襲する。
将来の TypeScript 移行時も型定義をフックに集中できる。
