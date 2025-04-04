export const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="size-full rounded-xl bg-white bg-clip-border shadow-md">
      {children}
    </div>
  );
};

export default Section;
