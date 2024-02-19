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
  onClick?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
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
};

export default function Button({
  text,
  background = "bg-gray-600",
  onClick,
  size = "lg",
  mode = "solid",
  secondary = false,
}: Props) {

  const getStyle = () => {
    let style = `flex items-center justify-center p-3 border-[1px] gap-3 transition-colors ${
      background ?? ""
    }`;

    style += ` ${CLASSES_BUTTON_SIZE_VARIANTS[size]}`;
    style += ` ${CLASSES_STATE_VARIANTS[mode]}`;

    if (secondary) {
      style += `${CLASSES_STATE_VARIANTS[`${mode}Secondary`]}`;
    }

    return style;
  };

  const handleClick = (event) => {
    onClick && onClick(event);
  };

  return (
    <button
      data-testid="button"
      className={getStyle()}
      onClick={(event) => handleClick(event)}
      onKeyDown={(event) => handleClick(event)}
    >
      {text}
    </button>
  );
}
