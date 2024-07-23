import { HTMLInputTypeAttribute } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type InputFieldProps = {
  type: HTMLInputTypeAttribute;
  placeholder: string;
  label?: string;
  error?: string;
  register: UseFormRegisterReturn;
};

export const InputField = ({
  type,
  placeholder,
  label,
  error,
  register,
  ...props
}: InputFieldProps) => {
  return (
    <label className="flex flex-col w-full">
      {label && (
        <div className="flex items-center justify-between px-1 py-2 hover:opacity-100">
          <span className="text-sm">{label}</span>
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`flex-shrink appearance-none h-12 px-4 text-base border border-gray-300 focus:ring-1 focus:ring-gray-400 focus:rounded-md w-full ${
          error ? 'border border-red-500 focus:border-red-500 focus:ring-0' : ''
        }`}
        {...register}
        {...props}
      />
      {error && (
        <div className="flex items-center justify-between px-1 py-2">
          <span className="text-xs text-red-500">{error}</span>
        </div>
      )}
    </label>
  );
};
