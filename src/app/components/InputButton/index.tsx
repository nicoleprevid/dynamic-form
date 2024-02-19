"use client";

import { CLASSES_BUTTON_SIZE_VARIANTS, CLASSES_STATE_VARIANTS } from "./utils";

type Props = {
  /**
   * Texto a ser exibido no botão
   */
  text: string;
  /**
   * Cor de background customizada
   */
  background?: string;
  /**
   * Uma função de callback, acionada quando o botão é clicado ou pressionado
   */
  onChange?: (event: React.ChangeEvent<HTMLDivElement>) => void;
  /**
   * Modo do botão para ajustar o estilo e dar ênfase desejada
   *
   * **• text:** botão plano sem fundo ou contorno, usado para ações de menor prioridade, especialmente ao apresentar várias opções.
   *
   * **• outlined:** botão com contorno sem fundo, geralmente usado para ações importantes, mas não primárias - representa uma ênfase média.
   *
   * **• solid:** botão com cor de fundo, usado para ações importantes com alto impacto visual e ênfase elevada.
   */
  mode?: "text" | "outlined" | "solid";
  /**
   * Tamanho do botão
   */
  size?: "sm" | "md" | "lg";
  /**
   * Um sinalizador booleano indicando se o botão realiza uma ação secundária
   */
  secondary?: boolean;
  /**
   * Define o tipo de arquivo
   */
  accept?: string;
  /**
   * Desabilita o botão
   */
  disabled?: boolean;
};

export default function InputButton({
  text,
  background = "bg-gray-600",
  onChange,
  size = "lg",
  mode = "solid",
  secondary = false,
  accept = "*",
  disabled = false,
}: Props) {
  const handleChange = (event) => {
    onChange && onChange(event);
  };
  const getStyle = () => {
    let style = `flex items-center justify-center p-3 border-[1px] gap-3 transition-colors truncate non-wrap ${
      background ?? ""
    }`;

    style += ` ${CLASSES_BUTTON_SIZE_VARIANTS[size]}`;
    style += ` ${CLASSES_STATE_VARIANTS[mode]}`;

    if (secondary) {
      style += `${CLASSES_STATE_VARIANTS[`${mode}Secondary`]}`;
    }

    return style;
  };

  return (
    <label className="block text-sm font-medium text-gray-600 cursor-pointer">
      <span className={getStyle()}>{text}</span>
      <input
      disabled={disabled}
        type="file"
        multiple={false}
        data-testid="button"
        className="hidden"
        accept={accept}
        onChange={(event) => handleChange(event)}
        onKeyDown={(event) => handleChange(event)}
      />
    </label>
  );
}
