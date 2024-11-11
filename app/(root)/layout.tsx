import Header from "@/components/nav/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="text-white h-screen flex flex-col items-center overflow-hidden">
        <Header/>
        {children}
      </main>
   );
};

export default layout;