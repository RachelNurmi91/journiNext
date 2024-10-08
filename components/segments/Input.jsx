const Input = ({ id, label, type, placeholder, onChange, full = false, error, maxLength}) => {
  return (
    <div className={`${full ? 'w-full' : 'w-1/2 mb-0' } px-3 mb-0`}>
      <label 
        htmlFor={id}
        className={`block tracking-wide text-sm ${error ? 'text-red-500' : ''} font-bold mb-2`}
      >
        {label}
      </label>
      <input 
        id={id}
        type={type}
        placeholder={placeholder} 
        onChange={onChange}
        maxLength={maxLength}
        className={`appearance-none block w-full bg-white text-gray-700 border ${error ? 'border-red-500' : 'border-gray-300'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-neutral-50 text-sm`}
      />
    </div>
  );
}

export default Input;
