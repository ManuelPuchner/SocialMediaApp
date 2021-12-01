const FormHeader = ({ ...props }) => {
  return <h3 className="text-2xl font-semibold" {...props}></h3>;
};

const FormTextarea = ({ ...props }) => {
  return (
    <textarea
      className="form-textarea
        bg-transparent 
        rounded-sm 
        ring-black 
        ring-2
        px-2
        py-1.5
        transition
        transform
        focus:outline-none
        focus:shadow-lg
        focus:-translate-y-0.5
        mb-3
        placeholder-opacity-75
        placeholder-black
        h-1/2
      "
      {...props}
    ></textarea>
  );
};

const FormSubmit = ({ ...props }) => {
  return (
    <input
      className="
        bg-transparent 
        rounded-sm 
        ring-black 
        ring-2
        px-2
        py-2
        transition
        transform
        focus:outline-none
        hover:shadow-lg
        hover:-translate-y-0.5
        active:transform-none
        mt-2
      "
      type="submit"
      {...props}
    />
  );
};

const FormLabel = ({ ...props }) => {
  return <label className="mb-1.5 mt-1" {...props}></label>;
};

const FormInput = ({ ...props }) => {
  return (
    <input
      className="
        bg-transparent 
        rounded-sm 
        ring-black 
        ring-2
        px-2
        py-1.5
        transition
        transform
        focus:outline-none
        focus:shadow-lg
        focus:-translate-y-0.5
        mb-3
        placeholder-opacity-75
        placeholder-black
      "
      {...props}
      required
    />
  );
};

export { FormSubmit, FormInput, FormLabel, FormHeader, FormTextarea };
