import { useState, useEffect } from "react";
import supabase from "../lib/supabase";

function GameListPage({ session }) {
  const [games, setGames] = useState([]);
  const [title, setTitle] = useState("");
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
        <p key={game.id}>{game.title}</p>
      ))}
    </div>
  );
}

export default GameListPage;
