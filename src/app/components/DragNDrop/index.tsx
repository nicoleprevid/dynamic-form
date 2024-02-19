import React, { useEffect, useState } from "react";
import Button from "../Button";
import Image from "next/image";
import InputButton from "../InputButton";


type Props = {
  onFileSelect:   (file: File | null) => void;
}

export default function DragNDrop({ onFileSelect }: Props) {
  // const [loading, setLoading] = useState(false);
  // const [uploadComplete, setUploadComplete] = useState(false);
  // const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    Array.from(droppedFiles).forEach((file) => {
      if (droppedFiles.length > 0) {
        setFile(droppedFiles[0]);
      }
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  useEffect(() => {
    onFileSelect(file);
  }, [file, onFileSelect]);

  const handleRemoveFile = () => {
    setFile(null);
  };


  return (
    <div className=" m-3 mx-10 bg-gray-50 rounded-[20px] h-fit w-fit flex flex-col items-center justify-center justify-self-center gap-2.5 p-3 shadow-md">
      <div
        onDrop={(event) => handleDrop(event)}
        onDragOver={(event) => event.preventDefault()}
        className=" w-full border-dashed border-2 rounded-2xl border-[#E1E7EE] bg-gray-50 p-1 flex flex-col items-center justify-center gap-4"
      >
        <Image
          className="hidden md:block"
          src="icons/folder_open.svg"
          alt="upload"
          width={100}
          height={100}
        />
        <Image
          className="block md:hidden"
          src="icons/folder_open.svg"
          alt="upload"
          width={75}
          height={75}
        />
        <div className="flex items-center w-2/3 md:w-1/2 justify-between ">
        {/* {uploadComplete ? (
        <div>
          <p>Upload completo!</p>
        </div>
      ) : loading ? (
        <div>
          <p>{progress}%</p>
        </div>
      ) : ( */}
        <div>
         <p className="text-gray-800 text-[15px] text-center hidden md:block">
            Arraste seu arquivo para cá ou clique abaixo para selecioná-lo em
            seus arquivos. - apenas um arquivo é permitido
            <br />
            <span className="text-primary"> Limite: 1GB.</span>
          </p>
          <p className="text-gray-800 text-[15px] text-center  md:hidden">
            Clique abaixo para procurar recurso em seus arquivos.
          </p>
        </div>
      {/* )} */}
        </div>
        <section className="flex gap-6 ">
          <div className="hidden md:block">
            <InputButton
              text="Procurar em Arquivos"
              onChange={handleFileChange}
            />
          </div>
          <div className="md:hidden">
            <InputButton
              text="Procurar"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <span onClick={handleRemoveFile}>
              <Button text="Cancelar" mode="outlined" />
            </span>
          </div>
        </section>
        <section className="drag-drop flex items-center justify-center">
          {file && (
            <div className="file-item">
              <div className="file-info">
                <p>{file.name}</p>
              </div>
            </div>
          )}
        </section>
      </div>

    </div>
  );
}
