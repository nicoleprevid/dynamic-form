"use client";
import AdicionarRecurso from "./(home)/AdicionarRecursos";
import Header from "./components/Header";
import { useState } from "react";

export default function Home() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  return (
    <main className="flex min-h-screen h-fit flex-col items-center justify-between py-5 md:px-20 bg-gray-200">
      <Header></Header>
      <AdicionarRecurso></AdicionarRecurso>
    </main>
  );
}
