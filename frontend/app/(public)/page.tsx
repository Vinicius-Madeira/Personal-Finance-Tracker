import CustomChart from "@/components/homepage-bar-chart";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] justify-items-center p-4 mt-8">
        <main className="flex flex-col gap-4 w-250 text-center">
          <h1 className="font-bold text-7xl">
            Monitore suas despesas com clareza
          </h1>
          <p className="text-neutral-400 text-xl mt-2">
            Gráficos dinâmicos para facilitar sua gestão
          </p>
          <div className="flex gap-4 my-2 justify-center">
            <Button asChild className="px-6 h-12 text-lg rounded-xl">
              <Link href="/signup">Cadastrar</Link>
            </Button>
            <Button asChild className="px-6 h-12 text-lg rounded-xl">
              <Link href="/login">Login</Link>
            </Button>
          </div>
          <CustomChart />
          <Footer />
        </main>
      </div>
    </>
  );
}
