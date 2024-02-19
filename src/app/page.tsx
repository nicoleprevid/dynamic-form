"use client";
import AdicionarRecurso from "./(home)/AdicionarRecursos";
import Header from "./components/Header";

export default function Home() {

  return (
    <main className="flex min-h-screen h-fit flex-col items-center justify-between py-5 md:px-20 bg-gray-200">
      <Header></Header>
      <AdicionarRecurso></AdicionarRecurso>
    </main>
  );
}
