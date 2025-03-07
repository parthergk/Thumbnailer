"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ThumbnailFetcher = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    try {
      const updatedThumbnailGet = sessionStorage.getItem("img");
      const localThumbnail = updatedThumbnailGet ? JSON.parse(updatedThumbnailGet) : [];
      setThumbnails(localThumbnail);
    } catch (error) {
      console.error("Failed to parse sessionStorage data", error);
      setThumbnails([]); 
    }
  }, []);


  const fetchThumbnail = (): void => {

    const trimmedUrl = videoUrl.trim();
    if (trimmedUrl.length === 0) {
      alert("Enter Youtube Video Url");
      return;
    }

    // Extract video ID from multiple valid YouTube URL formats
    const videoIdMatch = trimmedUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    if (!videoId) {
      setVideoUrl('');
      alert("Invalid YouTube URL");
      return;
    }
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    if (thumbnails.includes(thumbnailUrl)) {
      setVideoUrl('');
      alert("Thumbnail Already Exists");
      return;
    }
    setThumbnails((prev)=>[...prev, thumbnailUrl]);
    setVideoUrl("");
  };
  
  useEffect(()=>{
    sessionStorage.setItem('img', JSON.stringify(thumbnails));
  },[thumbnails])

  const downloadThumbnail = async (thumbnailUrl: string) => {
    try {
      const response = await fetch(thumbnailUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "downloaded-thumbnail.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
  

  const analyzeThumbnail = (thumbnailUrl: string): void => {
    const queryParams = new URLSearchParams({ thumbnailUrl }).toString();
    const url = `/analyze?${queryParams}`;
    router.push(url);
  };

  return (
    <div className=" h-screen">
      <Card className="w-full m-5 p-6 border-none shadow-none mt-16 flex flex-col items-center">
        <CardHeader className=" px-0 sm:px-6">
          <CardTitle className=" text-center text-2xl md:text-4xl lg:text-6xl">YouTube Thumbnail Analyzer</CardTitle>
        </CardHeader>
        <CardContent className=" w-full max-w-3xl">
          <div className="flex flex-col sm:flex-row items-center space-x-4 space-y-6 sm:space-y-0">
            <Input
              type="text"
              placeholder="Enter YouTube video URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            <Button onClick={fetchThumbnail}>Fetch Thumbnail</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-4xl border-none">
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-h-[400px] overflow-y-scroll scrollbar-thin pb-24 space-y-6 sm:space-y-0">
            {thumbnails.map((thumbnailUrl, index) => (
              <div key={index} className="flex flex-col items-center">
                <Image
                  src={thumbnailUrl}
                  alt={`Thumbnail ${index}`}
                  width={272}
                  height={204}
                  className="w-full h-auto rounded"
                />

                <div className="flex justify-between mt-2 w-full">
                  <Button
                    variant="secondary"
                    onClick={() => downloadThumbnail(thumbnailUrl)}
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => analyzeThumbnail(thumbnailUrl)}
                  >
                    <Zap className="w-5 h-5" />
                    Analyze
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThumbnailFetcher;
