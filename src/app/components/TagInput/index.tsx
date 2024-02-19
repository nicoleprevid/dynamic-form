'use client';
import { ChangeEvent, useState, KeyboardEvent, useEffect } from 'react';
import { Tag } from './tag';

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
     * Tornar o componente obrigatório - Exemplo: required
     */
    required?: boolean;
    /**
     * Uma função acionada quando o valor do input é alterado
     */
    onTagsSelected: (tags: string[]) => void;
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
};
export default function TagInput({
    placeholder,
    width = 'w-full',
    height = 'h-[40px]',
    background = 'bg-gray-100',
    label,
    labelSize = 'text-10',
    labelColor = 'text-neutral-dark',
    messageError,
    error,
    required = false,
    onTagsSelected,
    maxLength,
    name,
}: Props) {

    // Estado para armazenar as tags inseridas
    const [tags, setTags] = useState<string[]>([]);
    // Estado para armazenar o valor do input
    const [inputValue, setInputValue] = useState<string>('');

    // Função para remover uma tag
    const onTagRemove = (text: string) => {
        setTags(tags.filter(tag => tag !== text));
    };

    // Função para lidar com a mudança no input
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    // Função para lidar com a tecla pressionada no input
    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue !== '') {
            // Verifica se a tag já existe na lista
            if (!tags.includes(inputValue)) {
                setTags([...tags, inputValue]);
                setInputValue('');
            } else {
                // Se a tag já existe, você pode tratar isso de alguma forma, como exibir uma mensagem de erro
                console.warn('Tag já existe na lista.');
                setInputValue('');
            }
        }
    };
    
useEffect (()=>{
    onTagsSelected(tags)
}, [tags])

    return (
        <div className={`flex flex-col gap-2 wrap ${width}`}>
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
                className={`${width} h-fit flex flex-wrap flex-row items-center gap-x-2 rounded-md px-4 py-2 ${error ? 'border-2 border-secondary' : 'border border-neutral'
                    }  ${background} focus-within:bg-gray-50`}
            >
                <div className="flex w-fit gap-1 flex-wrap">
                    {tags.map(tag => (
                        <Tag
                            key={tag}
                            text={tag}
                            remove={onTagRemove}
                        />
                    ))}
                    </div>
                    <input
                        name={name}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        data-testid="input"
                        className={`truncate w-full placeholder-gray-600 outline-none focus:bg-gray-50  ${background} `}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        autoFocus={false}
                        value={inputValue}
                    />
            </div>
        </div>
    );
}
