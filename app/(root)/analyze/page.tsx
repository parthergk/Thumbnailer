"use client";
import LeftSideBar from "@/components/LeftSideBar";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useDetailItem } from "@/context/DetailItelmProvider";
import Font from "@/components/resourcesItem/Font";
import Background from "@/components/resourcesItem/Background";
import Color from "@/components/resourcesItem/Color";
import Img from "@/components/resourcesItem/Img";
import Detail from "@/components/resourcesItem/Detail";
import { aiApi } from "@/lib/actions/aiApi.action";
import { useEffect, useState } from "react";
import {
  DETAILED_FONT_PROMPT,
  FONT_AND_BACKGROUND_PROMPT,
} from "@/lib/prompts";
import { Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


interface FontItem {
  text: string;
  [key: string]: string;
}

interface ColorItem {
  code: string;
  name: string;
}

const Analyze: React.FC = () => {
  const [feedback, setFeedback] = useState("");
  const searchParams = useSearchParams();
  const thumbnailUrl = searchParams ? searchParams.get("thumbnailUrl") : null;
  
  const router = useRouter();
  const { data, status } = useSession();

  const { detailItem } = useDetailItem();

  const [textDataorg, setTextDataorg] = useState<FontItem[]>([]);
  const [colorData, setColorData] = useState<ColorItem[]>([]);
  const [isSaving, setIsSeving] = useState<boolean>(false);

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

    console.log("ai api call", thumbnailUrl);
    
    try {
      const data = await aiApi({ prompt: prompts, img: thumbnailUrl });
      // const jsonresponse = data.replace(/```json|```/g, '');

      // Extract JSON from response
      const jsonPart = data.match(/\{[\s\S]*\}/)?.[0];
      if (!jsonPart) {
        console.error("No JSON found in the response");
        return;
      }

      const parsedData = JSON.parse(jsonPart);

      // Update states with parsed data
      if (parsedData.fonts) {
        setTextDataorg(parsedData.fonts as FontItem[]);
      }
      if (parsedData.colors) {
        setColorData(parsedData.colors as ColorItem[]);
      }
    } catch (error) {
      console.error("API call error:", error);
    }
  };

  async function handleSave() {
    setIsSeving(true);
    try {
      const response = await fetch("api/thumbnail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: data?.user?._id,
          imgUrl: thumbnailUrl,
        }),
      });

      setIsSeving(false);
      if (response.status === 401) {
        // router.push("/sign-in");
        router.replace(`/sign-in?callbackUrl=${encodeURIComponent(window.location.href)}`);
        return;
      }

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setFeedback("Thumbnail saved successfully!");
        } else {
          setFeedback("Failed to save thumbnail: " + result.message);
        }
      }
    } catch (error) {}
  }
  useEffect(() => {}, [data, status]);

  return (
    <main className="self-start w-full mt-16 flex dark:bg-neutral-900 border-t">
      <LeftSideBar />
      <div className="w-full px-3 sm:px-5 dark:bg-neutral-900">
        <div className=" px-0 md:px-6 py-5 space-y-1">
          <h3 className=" text-neutral-900 dark:text-white text-xl font-semibold">Analytics of your Thumbnail</h3>
          <p className="text-sm text-neutral-400">
            Here are the details about this Thumbnail like Font, Color, Background, etc.
          </p>
        </div>
        <div className=" px-0 md:px-6">
          <div className="flex flex-col gap-5">
            {thumbnailUrl ? (
              <>
              <div className="flex flex-col lg:flex-row space-x-0 md:space-x-5 gap-5">
                <div className="  w-full max-w-[272px] sm:max-w-[400px]">
                  <Image
                    src={thumbnailUrl}
                    alt="Thumbnail"
                    width={400}
                    height={(400 / 16) * 9}
                    className="w-full h-auto rounded-sm shadow-lg shadow-neutral-500 dark:shadow-neutral-950"
                    loading="lazy"
                  />
                </div>
                <div className="h-full w-full max-w-72 sm:max-w-sm max-h-[280px] lg:max-h-[500px] overflow-y-scroll lg:overflow-hidden scrollbar-thin">
                  <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {detailItem} Analysis
                  </h4>
                  {selectedItem ? selectedItem.component : <p className=" mt-5 text-center">No Data</p>}
                </div>
                </div>
                <div className=" flex flex-col gap-5 w-full max-w-[272px] sm:max-w-[400px]">
                  <button className="shadow-lg py-1.5 bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:scale-105 dark:hover:shadow-neutral-950 dark:hover:bg-neutral-50 rounded-sm" onClick={() => handleSave()} disabled={isSaving}>
                    {isSaving ? "Saveing Thumbnail" : "Save Thumbnail"}
                  </button>
                  {feedback && (
                    <p className="text-sm text-gray-500">{feedback}</p>
                  )}
                </div>
              </>
            ) : (
              <p className="text-gray-500">No thumbnail URL provided.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

const AnalyzeWithSuspense: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Analyze />
  </Suspense>
);

export default AnalyzeWithSuspense;
