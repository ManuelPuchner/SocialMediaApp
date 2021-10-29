const FormHeader = ({ ...props }) => {
  return <h3 {...props} className="text-2xl font-semibold"></h3>;
};

const FormSubmit = ({ ...props }) => {
  return (
    <input
      {...props}
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
        mt-2
      "
    />
  );
};

const FormLabel = ({ ...props }) => {
  return <label {...props} className="mb-1.5 mt-1"></label>;
};

const FormInput = ({ ...props }) => {
  return (
    <input
      {...props}
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
      "
      required
    />
  );
};

export { FormSubmit, FormInput, FormLabel, FormHeader };
