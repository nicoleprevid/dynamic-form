'use client';
import Image from 'next/image';
import { ChangeEvent } from 'react';

export type Props = {
  /**
   * Em todos as propriedades deve-se usar a notação do tailwindcss conforme exemplo em cada um
   */
  /**
   * Texto a ser exibido no placeholder
   */
  placeholder?: string;
  /**
   * Largura do input - Exemplo: w-[14px]
   */
  width?: string;
  /**
   * Altura do input - Exemplo: h-[14px]
   */
  height?: string;
  /**
   * Background do input - Exemplo: bg-red-500 || bg-neutral-dark
   */
  background?: string;
  /**
   * Texto que vai em cima do input
   */
  label?: string;
  /**
   * Tamanho do texto label - Exemplo: text-[14px]
   */
  labelSize?: string;
  /**
   * Cor do texto label - Exemplo: neutral-dark
   */
  labelColor?: string;
  /**
   * Propriedade para exibir o erro no input. Mensagem de erro e borda em vermelho - Exemplo: error={true}
   */
  error?: boolean;
  /**
   * Mensage de erro para ser exibido caso a propriedade error seja true
   */
  messageError?: string;
  /**
   * Desativar o input - Exemplo: disabled={true}
   */
  disabled?: boolean;
  /**
   * Tornar o componente obrigatório - Exemplo: required
   */
  required?: boolean;
  /**
   * Uma função acionada quando o valor do input é alterado
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Determina o tamanho máximos de caracteres dentro do input
   */
  maxLength?: number;
  /**
   * Determina o valor do input
   */
  value?: string;
  /**
   * Determina o valor default do input
   */
  defaultValue?: string;
  /**
   * Identificador do input para referenciar no submit do formulário
   */
  name?: string;
  /**
   * Função de clique down (quando usuário segura o clique) do mouse para mudanças de estado ao clicar no ícone
   */
  onMouseDown?: () => void;
  /**
   * Função de clique up (quando usuário solta o clique) do mouse para mudanças de estado ao clicar no ícone
   */
  onMouseUp?: () => void;
  /**
   * Determina se o input deve ser focado ao ser renderizado
   */
  autoFocus?: boolean;
  /**
   * Determina o tipo do input
   */
  type?: 'text' | 'password';
};

export default function InputText({
  placeholder,
  width = 'w-full',
  height = 'h-[40px]',
  background = 'bg-gray-100',
  label,
  labelSize = 'text-10',
  labelColor = 'text-neutral-dark',
  messageError,
  error,
  disabled,
  required = false,
  onChange,
  maxLength,
  value,
  name,
  onMouseDown,
  onMouseUp,
  type = 'text',
  autoFocus = false,
}: Props) {

  return (
    <div className={`flex flex-col gap-2 ${width}`}>
      <div
        data-testid="input-label"
        className={`${labelSize} mb-1 block font-bold text-gray-700 ${labelColor}`}
      >
        {label ? label : null}
        {label && required ? <span>*</span> : null}
      </div>
      {error && messageError ? (
        <div className="text-[14px] text-secondary">{messageError}</div>
      ) : null}

      <div
        data-testid="input-container"
        className={`${width} ${height} flex flex-row items-center gap-x-2 rounded-md px-4 py-2 ${
          error ? 'border-2 border-secondary' : 'border border-neutral'
        } ${
          disabled ? 'border-[1px] border-gray-400 bg-gray-200' : background
        } focus-within:bg-gray-50`}
      >
        <input
          name={name}
          onChange={onChange}
          data-testid="input"
          className={`w-full placeholder-gray-600 outline-none ${
            disabled ? 'bg-gray-200 text-gray-500' : background
          } focus:bg-gray-50`}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          type={type}
          autoFocus={autoFocus}
          // TODO: avaliar o uso da prop abaixo, pois exibe um tooltip nativo não listado no design
          // required={required}
        />
      </div>
    </div>
  );
}
