"use client"
import { useState } from "react";
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

  const fetchThumbnail = (): void => {
    const videoId = videoUrl.split("v=")[1]?.split("&")[0];
    if (!videoId) {
      throw new Error("Invalid YouTube URL");
    }
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
    console.log("Thumbnail url",thumbnailUrl);
    
    setThumbnails([...thumbnails, thumbnailUrl]);
    setVideoUrl("");
  };

  const downloadThumbnail = (thumbnailUrl: string): void => {
    const link = document.createElement("a");
    link.href = thumbnailUrl;
    link.download = 'downloaded-image.jpg';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const analyzeThumbnail = (thumbnailUrl: string): void => {
    const queryParams = new URLSearchParams({ thumbnailUrl }).toString();
    const url = `/analyze?${queryParams}`;
    router.push(url);
  };

  return (
    <>
      <Card className="w-full max-w-3xl m-5 p-6 border-none mt-16">
        <CardHeader>
          <CardTitle className=" text-center">YouTube Thumbnail Analyzer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
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
          <div className="grid grid-cols-3 gap-4 mt-8 max-h-[400px] overflow-y-scroll scrollbar-thin pb-24">
            {thumbnails.map((thumbnailUrl, index) => (
              <div key={index} className="flex flex-col items-center">
                <Image
                  src={thumbnailUrl}
                  alt={`Thumbnail ${index}`}
                  width={272}
                  height={204}
                  className="w-full rounded"
                  style={{ maxWidth: '272px', maxHeight: '204px' }}
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
    </>
  );
};

export default ThumbnailFetcher;
