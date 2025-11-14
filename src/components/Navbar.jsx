import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import useAuthUser from "@/hooks/useAuthUser";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn, UserPlus } from "lucide-react";

export default function NavBar() {
  const { user } = useAuthUser();
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    localStorage.removeItem("active_business_id"); // optional
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-50 w-full  border-slate-200/150 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/70 backdrop-blur h-14 flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-lg hidden sm:block">
          <Button onClick={() => navigate("/home")}>ZapSolution</Button>
        </span>
      </div>

      <div className="flex items-center gap-2 ">
        {user ? (
          <Button
            size="sm"
            onClick={handleLogout}
            className={"border hover:bg-red-500 hover:text-white"}
          >
            <LogOut className="h-4 w-4 mr-1" /> Logout
          </Button>
        ) : (
          <>
            <Button size="sm" onClick={() => navigate("/login")} className={"border hover:bg-blue-500 hover:text-white"}>
              <LogIn className="h-4 w-4 mr-1" /> Login
            </Button>
            <Button size="sm" onClick={() => navigate("/register")} className={"border hover:bg-red-500 hover:text-white"}>
              <UserPlus className="h-4 w-4 mr-1" /> Register
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
