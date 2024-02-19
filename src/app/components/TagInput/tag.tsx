type TagProps = {
    text: string;
    remove: (text: string) => void;
};

export function Tag ({ text, remove,  }:TagProps) {
    return (
        <div className="flex content-center justify-center px-2 h-6 bg-primary text-white rounded-md gap-1">
            <span>{text}</span>
            <button onClick={() => remove(text)}>X</button>
        </div>
    );
};
