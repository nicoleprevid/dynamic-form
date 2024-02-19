import Button from '@/app/components/Button';
import DragNDrop from '@/app/components/DragNDrop';
import InputButton from '@/app/components/InputButton';
import InputText from '@/app/components/InputText';
import TagButton from '@/app/components/TagButton';
import TagInput from '@/app/components/TagInput';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { data } from './mock';

type Props = {
  tipo: string;
  nome: string;
  arquivo: File | null;
  descricao: string;
  etapasEnsino: string[];
  series: string[];
  componentesCurricular: string[];
  categoria: string;
  thumbnail: File | null;
  tags: string[];
}

export default function AdicionarRecurso() {
  const [formData, setFormData] = useState<Props>({
    tipo: '',
    nome: '',
    arquivo: null,
    descricao: '',
    etapasEnsino: [],
    series: [],
    componentesCurricular: [],
    categoria: '',
    thumbnail: null,
    tags: [],
  });

  useEffect(() => {
    updateFormData("tipo", tipoSelected, false);
  }, []);

  const [selectedFile, setSelectedFile] = useState<File | []>(null);
  const [message, setMessage] = useState("");
  const [showCard, setShowCard] = useState(false);

  const handleFileSelect = (file: File | []) => {
    setSelectedFile(file);
    // manda info para formData
  };

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      // Similarmente, armazene o arquivo diretamente no estado do formulário
      updateFormData("thumbnail", selectedFile, false);
    }
  };

  const [campos, setCampos] = useState([]);
  const [tipoSelected, setTipoSelected] = useState<string>("Documento");

  const getDependenciesToRemove = (removedSegment: string) => {
    const segment = data.file_type[0].filters.find((tipo) => tipo.segments.find((seg) => seg.name === removedSegment));

    if (!segment) {
      return null;  // Segmento não encontrado
    }

    const dependenciesToRemoveSerie: string[] = [];
    const dependenciesToRemoveDisc: string[] = [];
    let dependenciesToRemoveCate: string | null = null;

    // Adicione as séries, componentes curriculares e categorias do segmento às dependências
    const removedSeg = segment.segments.find((seg) => seg.name === removedSegment);
    if (removedSeg) {
      dependenciesToRemoveSerie.push(...removedSeg.grade.map((serie) => serie.name));
      dependenciesToRemoveDisc.push(...removedSeg.disciplines.map((disciplina) => disciplina.name));
      // Verifique se há categorias e pegue o nome da primeira
      if (removedSeg.category && removedSeg.category.length > 0) {
        dependenciesToRemoveCate = removedSeg.category[0].name;
      }
    }
    return [dependenciesToRemoveSerie, dependenciesToRemoveDisc, dependenciesToRemoveCate];
  };

  const updateFormData = (campo: string, valor: string | File, isTodos: boolean) => {
    setFormData((prevData) => {
      const previousData = { ...prevData };
      const updates = {};  // Objeto temporário para armazenar as atualizações
      const currentList = previousData[campo];

      // se for no campo tipo determina os campos
      if (campo === "tipo") {
        const tipo = data.file_type.find((tipo) => tipo.name === valor);
        setCampos(tipo ? tipo.filters : []);
        setTipoSelected(valor as string);
      }
      else if (campo === "etapasEnsino" && !isTodos) {

        // deleta dependências
        const dependenciesToRemove = getDependenciesToRemove(valor as string);
        if (dependenciesToRemove) {
          updates["series"] = previousData.series.filter((ser) => !dependenciesToRemove[0].includes(ser));
          updates["componentesCurricular"] = previousData.componentesCurricular.filter((comp) => !dependenciesToRemove[1].includes(comp));
          updates["categoria"] = !dependenciesToRemove[2];
        };
        // deleta 
        updates[campo] = currentList.filter((item) => item !== valor);
      } else {
        updates[campo] = [currentList, valor as string];
      }

      // Verifica se é uma lista
      if (Array.isArray(currentList)) {
        // se for repetido e nao vir do botao "selecionar todos" 
        // se for clicado duas vezes retira do formData
        if (currentList.includes(valor as string) && !isTodos) {
          updates[campo] = currentList.filter((item) => item !== valor);
        } else {
          updates[campo] = [...currentList, valor as string];
        }
      } else {
        // se nao for lista um clique substitui o antigo
        updates[campo] = valor;
      }
      return { ...previousData, ...updates };
    })
  }

  const renderTagButton = (opcao: string, status: 'selectPrimary' | 'default', campo: string,) => {
    return (
      <TagButton
        text={opcao}
        size="sm"
        status={status}
        onClick={() => {
          updateFormData(campo, opcao, false);
        }}
      />
    );
  };

  const handleFormSubmit =()=> {
    setShowCard(true)
    setTimeout(() => setShowCard(false), 3000)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  function selectTodos(campo, campoFormData) {
    const clickedEtapas = formData.etapasEnsino
    const handleSelectTodos = () => {

      if (campo === "segment") {
        //filter no caso seria documento, video, etc
        const filters = data.file_type[0].filters
        filters.forEach(filter => {
          const segments = filter.segments
          // percorre cada segmento e adiciona a formData
          segments.forEach(segment => {
            updateFormData(campoFormData, segment.name, true);

          })
        })
      }
      else (
        clickedEtapas.forEach((clickedEtapa) => {
          // corresponde clickedEtapa como o mock
          const filters = data.file_type[0].filters.find((tipo) =>
            tipo.segments.find((seg) => seg.name === clickedEtapa)
          );
          const segments = filters.segments.find((seg) => seg.name === clickedEtapa);

          if (segments) {
            const campoSelecionado = segments[campo]
            campoSelecionado.forEach(opcoes => {
              updateFormData(campoFormData, opcoes.name, true);
            })
          }
        }
        ))
    }

    return (
      <button onClick={(handleSelectTodos)} className="flex w-fit h-fit self-center bg-gray-200 text-secondary px-1 rounded-lg text-xs border border-secondary">selecionar todos</button>
    );
  }

  const renderSegment = (segments) => {
    return (
      <div className="flex flex-col gap-5">
        {segments[0]?.grade && (
          <div className="flex gap-2 flex-col flex-wrap">
            <div className="flex flex-row content-center justify-between">
              <label className="font-bold text-gray-700">Série</label>
              {selectTodos("grade", "series")}
            </div>
            <div className="flex gap-2 flex-wrap">
              {segments.map((segment) =>
                segment.grade ? (
                  segment.grade.map((grade) =>
                    renderTagButton(grade.name, formData.series.includes(grade.name) ? 'selectPrimary' : 'default', "series")
                  )
                ) : null
              )}
            </div>
          </div>
        )}

        {segments[0]?.disciplines && (
          <div className="flex gap-2 flex-col flex-wrap">
            <div className="flex flex-row content-center justify-between">
              <label className="font-bold text-gray-700">Componente Curricular</label>
              {selectTodos("disciplines", "componentesCurricular")}
            </div>
            <div className="flex gap-2 flex-wrap">
              {segments.map((segment) =>
                segment.disciplines ? (
                  segment.disciplines.map((discipline) =>
                    renderTagButton(discipline.name, formData.componentesCurricular.includes(discipline.name) ? 'selectPrimary' : 'default', "componentesCurricular")
                  )
                ) : null
              )}
            </div>
          </div>
        )}

        {segments[0]?.category && (
          <div className="flex gap-2 flex-col flex-wrap">
            <label className="font-bold text-gray-700">Categoria</label>
            <div className="flex gap-2 flex-wrap">
              {segments.map((segment) =>
                segment.category ? (
                  segment.category.map((category) =>
                    renderTagButton(category.name, formData.categoria === category.name ? 'selectPrimary' : 'default', "categoria")
                  )
                ) : null
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col xl:w-4/5 h-full self-center">
      <form data-testid="form-add-resource" className="bg-gray-50 flex flex-col lg:flex-row rounded-lg p-10 w-full gap-5 self-center" onSubmit={handleSubmit}>
        <div data-testid="left-side-form" className="flex flex-col gap-5 flex-wrap w-full xl:w-1/2 h-fit">
          <div className="flex gap-2 flex-col flex-wrap">
            <div data-testid="title-add-resource" className="flex gap-2 flex-row flex-wrap">
              <Image
                src="/icons/pencil.svg"
                alt="Icon Button"
                width={24}
                height={24}
              />
              <label className="font-bold text-lg text-gray-700">Adicione um Recurso</label>
            </div>

            <label className="font-bold text-gray-700">Tipo</label>
            <div className="flex gap-2 flex-wrap">
              {data.file_type.map((tipo) => (
                renderTagButton(tipo.name, tipoSelected === tipo.name ? 'selectPrimary' : 'default', "tipo")
              ))}
            </div>
          </div>
          {tipoSelected != "Link" && (
            <DragNDrop onFileSelect={handleFileSelect} />
          )}
          <InputText
            placeholder="Nomeie o recurso"
            label="Nome"
            onChange={(event) => setFormData({ ...formData, nome: event.target.value })}
          />
          <InputText
            placeholder="Descreva aqui o recurso"
            label="Descrição"
            onChange={(event) => setFormData({ ...formData, descricao: event.target.value })}
          />
        </div>
        <div data-testid="right-side-form" className="flex flex-col gap-5 flex-wrap w-full xl:w-1/2  h-fit">
          <div className="flex gap-2 flex-wrap">
            <div className="flex flex-row w-full content-center justify-between">
              <label className="font-bold text-gray-700">Etapa de Ensino</label>
              {selectTodos("segment", "etapasEnsino")}
            </div>
            <div className="flex gap-2 flex-wrap">
              {campos.map((campo) => (
                campo && campo.segments &&
                campo.segments.map((segment) =>
                  renderTagButton(segment.name, formData.etapasEnsino.includes(segment.name) ? 'selectPrimary' : 'default', "etapasEnsino")
                )
              ))}
            </div>
          </div>

          {campos.map((campo) => {
            const segments = campo.segments?.filter((segment) => formData.etapasEnsino.includes(segment.name));
            if (segments) {
              return renderSegment(segments);
            }
          })}

          {tipoSelected === "Video" && (
            <div>
              <label className="block mb-1 font-bold text-gray-700">Thumbnail</label>
              <InputButton
                text="Procurar em Arquivos uma Imagem"
                onChange={handleThumbnailChange}
                accept="image/*"
                size="md"
              />
            </div>
            //TODO: mostrar na tela imagem ou nome imagem pra mostrar que deu certo
          )}
          <TagInput
            placeholder="Descreva com palavras-chave separando com Enter"
            label="Palavras-Chave"
            onTagsSelected={(tags) => setFormData({ ...formData, tags: tags })}
          />
        </div>
      </form>
      <div className="flex self-end m-2"><Button text="Cadastrar" onClick={handleFormSubmit}></Button></div>
      {/* Mostra o card se showCard for true */}
      {showCard && (
        <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Formulário Enviado</h2>
            <p>tipo: {formData.tipo}</p>
            <p>nome: {formData.nome}</p>
            <p>arquivo: {formData.arquivo}</p>
            <p>descricao: {formData.descricao}</p>
            <p>etapasEnsino: {formData.etapasEnsino}</p>
            <p>series: {formData.series}</p>
            <p>componentesCurricular: {formData.componentesCurricular}</p>
            <p>categoria: {formData.categoria}</p>
            <p>thumbnail: {formData.thumbnail}</p>
            <p>tags: {formData.tags}</p>
            {/* Adicione formData.tagsmais campos conforme necessário */}
          </div>
        </div>
      )}
    </div>
  );
}
