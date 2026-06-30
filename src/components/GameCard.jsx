import { Button } from "@/components/ui/button";
import { STATUS } from "@/utils/status";
import { PLATFORM } from "@/utils/platform";

function GameCard({ game, onStatusChange, onClick }) {
  const platformStyle = PLATFORM[game.platform];
  const PlatformIcon = platformStyle?.icon;
  return (
    <div
      className="flex items-center gap-2 p-3 border rounded cursor-pointer hover:bg-gray-50"
      onClick={onClick}
    >
      <span className="font-medium flex-1">{game.title}</span>
      <span
        className={`inline-flex items-center justify-center w-20 gap-1 text-xs px-2 py-1 rounded ${platformStyle?.className ?? "bg-gray-200 text-gray-500"}`}
      >
        {PlatformIcon && <PlatformIcon />}
        {game.platform ?? "未設定"}
      </span>
      <div className="flex gap-1">
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onStatusChange(game.id, STATUS[game.status].next);
          }}
          className={"w-20 " + STATUS[game.status].className}
        >
          {STATUS[game.status].label}
        </Button>
      </div>
    </div>
  );
}

export default GameCard;
