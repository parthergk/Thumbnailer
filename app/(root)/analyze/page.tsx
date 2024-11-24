"use client";
import LeftSideBar from "@/components/LeftSideBar";
import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useDetailItem } from "@/context/DetailItelmProvider";
import Font from "@/components/resourcesItem/Font";
import Background from "@/components/resourcesItem/Background";
import Color from "@/components/resourcesItem/Color";
import Img from "@/components/resourcesItem/Img";
import Detail from "@/components/resourcesItem/Detail";
import { aiApi } from "@/lib/actions/aiApi.action";
import { useEffect, useState } from "react";
import { DETAILED_FONT_PROMPT, FONT_AND_BACKGROUND_PROMPT } from "@/lib/prompts";
import { Suspense } from "react";

// Define the type for font and color data
interface FontItem {
  text: string;
  [key: string]: string;
}

interface ColorItem {
  // Add properties based on your data structure
  code: string;
  name: string;
}

const Analyze: React.FC = () => {
  const searchParams = useSearchParams();
  const thumbnailUrl = searchParams ? searchParams.get('thumbnailUrl') : null;
  const { detailItem } = useDetailItem(); // You may want to type `detailItem`

  // Initialize state with type definitions
  const [textDataorg, setTextDataorg] = useState<FontItem[]>([]);
  const [colorData, setColorData] = useState<ColorItem[]>([]);

  const items = [
    { name: "Font", component: <Font data={textDataorg} /> },
    { name: "Color", component: <Color data={colorData} /> },
    { name: "Background", component: <Background /> },
    { name: "Image", component: <Img /> },
    { name: "Detail", component: <Detail /> },
  ];

  const selectedItem = items.find((item) => item.name === detailItem);

  useEffect(() => {
    if (thumbnailUrl) {
      apicall(DETAILED_FONT_PROMPT);
      apicall(FONT_AND_BACKGROUND_PROMPT);
    }
  }, [thumbnailUrl]);

  const apicall = async (prompts: string) => {
    if (!thumbnailUrl) return;

    try {
      const data = await aiApi({ prompt: prompts, img: thumbnailUrl });
      const jsonresponse = data.replace(/```json|```/g, '');
      const response = JSON.parse(jsonresponse);

      // Assuming the response has a "fonts" property
      if (response.fonts) {
        setTextDataorg(response.fonts);
      }

      // Handle color data if applicable
      if (response.colors) {
        setColorData(response.colors); // Assuming colors are returned
      }
    } catch (error) {
      console.error("API call error:", error);
    }
  };

  return (
    <main className="self-start w-full mt-16 flex">
      <LeftSideBar />
      <Card className="w-full px-3 sm:px-5">
        <CardHeader className=" px-0 md:px-6">
          <CardTitle>Analyze your thumbnail</CardTitle>
          <p className="text-sm text-gray-400">
            Get details about this thumbnail like font, color, background, etc.
          </p>
        </CardHeader>
        <CardContent className=" px-0 md:px-6">
          <div className="flex flex-col lg:flex-row space-x-0 md:space-x-5 gap-5">
            {thumbnailUrl ? (
              <>
                <div className=" w-full max-w-[272px] sm:max-w-[400px]">
                  <Image
                    src={thumbnailUrl}
                    alt="Thumbnail"
                    width={400}
                    height={(400 / 16) * 9}
                    className="w-full h-auto rounded"
                    loading="lazy"
                  />
                </div>
                <div className="h-full w-full max-w-72 sm:max-w-sm max-h-[280px] lg:max-h-[500px] overflow-y-scroll lg:overflow-hidden scrollbar-thin">
                  <h1 className="text-lg font-semibold">{detailItem} Analysis</h1>
                  {selectedItem ? selectedItem.component : <p>No Data</p>}
                </div>
              </>
            ) : (
              <p className="text-gray-500">No thumbnail URL provided.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

const AnalyzeWithSuspense: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Analyze />
  </Suspense>
);

export default AnalyzeWithSuspense;