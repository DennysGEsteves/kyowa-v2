export const FormGroup = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <div className="mb-4  border-b border-gray-400 p-2.5 text-2xl font-bold">
        Informações Gerais
      </div> */}
      <div className="mb-4 flex flex-row flex-wrap items-start gap-4">
        {children}
      </div>
    </>
  );
};

export default FormGroup;
