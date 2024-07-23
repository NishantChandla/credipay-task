import { UseFormRegisterReturn } from 'react-hook-form';

type RadioGroupProps = {
    error?: string;
    options: { label: string, description: string, value: string, disabled?: boolean }[];
    register: UseFormRegisterReturn;
};

export const RadioGroup = ({
    error,
    register,
    options,
    ...props
}: RadioGroupProps) => {
    return (
        <fieldset className="space-y-4">
            {options.map((option) => <div key={option.value}>
                <label
                    htmlFor={option.value}
                    className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                >
                    <div>
                        <p className="text-gray-700">{option.label}</p>

                        <p className="mt-1 text-gray-900">{option.description}</p>
                    </div>
                    <input
                        type="radio"
                        value={option.value}
                        id={option.value}
                        className="size-5 border-gray-300 text-blue-500"
                        disabled={option.disabled}
                        {...register}
                        {...props}
                    />
                </label>
            </div>)}
            {error && (
                <div className="flex items-center justify-between px-1 py-2">
                    <span className="text-xs text-red-500">{error}</span>
                </div>
            )}
        </fieldset>
    );
};
