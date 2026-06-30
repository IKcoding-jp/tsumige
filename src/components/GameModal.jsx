import { useState } from "react";
import { Button } from "@/components/ui/button";

function GameModal({ game, onSave, onDelete, onCancel }) {
  const [title, setTitle] = useState(game.title);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4">タイトルを編集</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-4"
        />
        <div className="flex justify-between">
          <Button variant="destructive" onClick={() => onDelete(game.id)}>
            削除
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel}>
              キャンセル
            </Button>
            <Button onClick={() => onSave(game.id, title)}>確定</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameModal;
