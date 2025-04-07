import { LoginForm } from "@/components/login-form";
import Countdown from "./Countdown";

export default function Auth() {
  return (
    <div className="grid grid-rows-[1fr_60px] justify-items-center p-4 ">
      <h1 className="font-bold text-5xl mt-32 mb-4 text-yellow-200">
        Esta página estará disponível na versão 2.0!
      </h1>
      <Countdown redirectURL="/dashboard" />
      <div className="w-[20%]">
        <LoginForm />
      </div>
    </div>
  );
}
