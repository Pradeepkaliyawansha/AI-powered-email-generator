import { InputFieldProps } from "@/lib/dto";

export default function InputField({
  label,
  value,
  onHandleInputChange,
  type,
  ...props
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        value={value}
        type={type}
        onChange={(event) => onHandleInputChange(event.target.value)}
        {...props}
      />
    </div>
  );
}
