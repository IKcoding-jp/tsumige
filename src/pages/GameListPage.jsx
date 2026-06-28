import { useState, useEffect } from "react";
import supabase from "../lib/supabase";

function GameListPage({ session }) {
  const [games, setGames] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  async function fetchGames() {
    const { data } = await supabase.from("games").select("*");
    setGames(data ?? []);
  }
  async function addGame(e) {
    e.preventDefault();
    if (!title) return;
    await supabase.from("games").insert({
      title,
      user_id: session.user.id,
      status: "unplayed",
    });
    setTitle("");
    fetchGames();
  }
  async function deleteGame(id) {
    await supabase.from("games").delete().eq("id", id);
    fetchGames();
  }
  async function updateGame(id) {
    await supabase.from("games").update({ title: editingTitle }).eq("id", id);
    setEditingId(null);
    fetchGames();
  }
  useEffect(() => {
    fetchGames();
  }, []);
  return (
    <div>
      <form onSubmit={addGame}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="ゲームタイトル"
        />
        <button type="submit">追加</button>
      </form>
      <h1>積みゲー一覧</h1>
      {games.map((game) => (
        <div key={game.id}>
          {editingId === game.id ? (
            <>
              <input
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
              />
              <button onClick={() => updateGame(game.id)}>確定</button>
              <button onClick={() => setEditingId(null)}>キャンセル</button>
            </>
          ) : (
            <>
              <span>{game.title}</span>
              <button
                onClick={() => {
                  setEditingId(game.id);
                  setEditingTitle(game.title);
                }}
              >
                編集
              </button>
              <button onClick={() => deleteGame(game.id)}>削除</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default GameListPage;
