import { UseFormRegisterReturn } from 'react-hook-form';

type SelectFieldProps = {
  label?: string;
  error?: string;
  options: {label:string, value:string}[];
  register: UseFormRegisterReturn;
};

export const SelectField = ({
  label,
  error,
  register,
  options,
  ...props
}: SelectFieldProps) => {
  return (
    <label className="flex flex-col w-full">
      {label && (
        <div className="flex items-center justify-between px-1 py-2 hover:opacity-100">
          <span className="text-sm">{label}</span>
        </div>
      )}
      <select
        className={`flex-shrink appearance-none h-12 px-4 text-base border border-gray-300 focus:ring-1 focus:ring-gray-400 focus:rounded-md w-full ${error ? 'border border-red-500 focus:border-red-500 focus:ring-0' : ''
          }`}
        {...register}
        {...props}
      >
        {options.map(option => <option key={option.label} value={option.value}>{option.label}</option>)}
      </select>
      {error && (
        <div className="flex items-center justify-between px-1 py-2">
          <span className="text-xs text-red-500">{error}</span>
        </div>
      )}
    </label>
  );
};
