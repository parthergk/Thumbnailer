import Header from "@/components/nav/Header";
import ThumbnailFetcher from "@/components/ThumbnailFetcher";

export default function Home() {
  return (
    <main className="text-white h-screen flex flex-col items-center overflow-hidden">
      <Header/>
      <ThumbnailFetcher/>
    </main>
  );
}
