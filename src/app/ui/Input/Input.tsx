'use client'
type InputProps = {
    label: string;
    name: string;
    type: string;
    error?: string | string[];
    value?: string;
    classNames?: string;
    placeholder?:string
};

export default function Input({ value, label, name, type, error, classNames,placeholder }: InputProps) {
    return (
        <div className={classNames}>
            <label className="block mb-2 capitalize" htmlFor={name}>
                {label}
            </label>

            <input className="appearance-none block w-full border border-gray-300 rounded py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name={name} id={name} type={type} value={value} placeholder={placeholder ? placeholder : 
                'Enter ' + name} />
            <span className="text-red-800 text-sm mt-1 block">

                {(type == 'password' && error) ?
                    (error.length == 1 && error[0] === 'Incorrect Password entered.') ?
                        error : (<div><p>Password must:</p>
                            <ul>
                                {Array.isArray(error) && error.map((e: string) => (
                                    <li key={e}>- {e}</li>
                                ))}
                            </ul> </div>)
                    : <p>{error}</p>}
            </span>
        </div>

    )
}