"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Zap } from "lucide-react";
import Image from "next/image";

const SavedThumbnails = () => {
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  useEffect(() => {
    const fetchThumbnails = async () => {
      try {
        const response = await fetch("/api/thumbnail");
        const data = await response.json();

        if (data.thumbnails && Array.isArray(data.thumbnails)) {
          setThumbnails(data.thumbnails.map((item: { img: string }) => item.img));
        }
      } catch (error) {
        console.error("Error fetching backend thumbnails:", error);
      }
    };

    fetchThumbnails();
  }, []);

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

  return (
    <>
      <Card className="w-full m-5 p-6 border-none mt-16 flex flex-col items-center">
        <CardHeader className="px-0 sm:px-6">
          <CardTitle className="text-center text-2xl md:text-4xl lg:text-6xl">
            Saved Thumbnails
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="w-full max-w-4xl border-none">
        <CardContent>
          {thumbnails.length === 0 ? (
            <p className="text-center text-gray-500">No saved thumbnails found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-h-[400px] overflow-y-scroll scrollbar-thin pb-24">
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
                    <Button asChild variant="secondary">
                      <a href={`/analyze?thumbnailUrl=${encodeURIComponent(thumbnailUrl)}`}>
                        <Zap className="w-5 h-5" />
                        Analyze
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default SavedThumbnails;
