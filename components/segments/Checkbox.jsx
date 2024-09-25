const Checkbox = ({ id, label, labelExplanation: labelDesc, onChange }) => {
  return (
    <div className="w-full px-3 mb-0 flex gap-x-3">
      <div className="flex h-6 items-center">
        <input 
          id={id}
          type="checkbox" 
          onClick={onChange}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </div>
      <div className="text-sm leading-6">
        <label 
          htmlFor={id} 
          className="font-medium text-gray-900"
        >
          {label}
        </label>
          {labelDesc && <p className="text-gray-500">{labelDesc}</p>}
      </div>
    </div>
  );
}

export default Checkbox;
