import { Button } from "@/components/ui/button";

function Header({ onSignOut }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">ツミゲ</h1>
      <Button variant="outline" onClick={onSignOut}>
        ログアウト
      </Button>
    </div>
  );
}

export default Header;
