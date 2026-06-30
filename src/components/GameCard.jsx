import { Button } from "@/components/ui/button";
import { SiPlaystation, SiSteam } from "react-icons/si";
import { BsNintendoSwitch } from "react-icons/bs";
import { FaDesktop, FaMobileScreen, FaGamepad } from "react-icons/fa6";

const PLATFORM_STYLE = {
  Switch: { icon: BsNintendoSwitch, className: "bg-[#E60012] text-white" },
  PS5: { icon: SiPlaystation, className: "bg-[#006FCD] text-white" },
  PS4: { icon: SiPlaystation, className: "bg-[#006FCD] text-white" },
  Steam: { icon: SiSteam, className: "bg-[#171a21] text-white" },
  PC: { icon: FaDesktop, className: "bg-slate-600 text-white" },
  スマホ: { icon: FaMobileScreen, className: "bg-emerald-600 text-white" },
  その他: { icon: FaGamepad, className: "bg-amber-600 text-white" },
};

function GameCard({ game, onEdit, onDelete, onStatusChange }) {
  function nextStatus(current) {
    if (current === "unplayed") return "playing";
    if (current === "playing") return "cleared";
    return "unplayed";
  }
  const platformStyle = PLATFORM_STYLE[game.platform];
  const PlatformIcon = platformStyle?.icon;
  return (
    <div className="flex items-center gap-2 p-3 border rounded">
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
          onClick={() => onStatusChange(game.id, nextStatus(game.status))}
          className={
            "w-20 " +
            (game.status === "playing"
              ? "border-blue-500 text-blue-500"
              : game.status === "cleared"
                ? "border-green-600 text-green-600"
                : "text-gray-500")
          }
        >
          {game.status === "unplayed"
            ? "未プレイ"
            : game.status === "playing"
              ? "プレイ中"
              : "クリア済み"}
        </Button>
        <Button variant="outline" onClick={() => onEdit(game)}>
          編集
        </Button>
        <Button variant="destructive" onClick={() => onDelete(game.id)}>
          削除
        </Button>
      </div>
    </div>
  );
}

export default GameCard;
