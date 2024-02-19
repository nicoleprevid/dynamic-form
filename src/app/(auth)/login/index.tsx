import InputText from "@/app/components/InputText";
import Image from "next/image";
import Button from "@/app/components/Button";

export default function Login() {
  return (
    <main className="bg-gradient-to-b from-gray-300 via-gray-400 to-transparent w-full min-h-screen flex items-center justify-center ">
      <div className="flex flex-col gap-5 items-center justify-center bg-primary w-fit h-fit rounded-3xl pt-6 pb-9 px-11 w-[500px]">
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/icons/logo-sme-files.svg"
            alt="Logo"
            width={260}
            height={150}
          />
          <div className="text-white flex flex-col items-center justify-center">
            <p className="font-bold text-2xl">Seja bem-vindo !</p>
            <p className="text-lg">
              Cadastre e atualize os Recursos do Sistema Mackenzie de Ensino
              aqui.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <InputText
            placeholder="E-mail"
            onChange={() => {}}
            background="bg-white"
          />
            <InputText
              placeholder="Senha"
              onChange={() => {}}
              background="bg-white"
              type="password"
            />
        </div>
        <Button
          text="Entrar"
          onClick={() => {}}
          background="bg-white"
          secondary
          mode="text"
        />
      </div>
    </main>
  );
}
