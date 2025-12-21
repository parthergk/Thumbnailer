"use client";

import LeftSideBar from "@/components/LeftSideBar";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useDetailItem } from "@/context/DetailItelmProvider";
import Font from "@/components/resourcesItem/Font";
import Background from "@/components/resourcesItem/Background";
import Color from "@/components/resourcesItem/Color";
import Img from "@/components/resourcesItem/Img";
import Detail from "@/components/resourcesItem/Detail";
import { useEffect, useState, Suspense, useCallback } from "react";
import { useSession } from "next-auth/react";
import { THUMBNAIL_ANALYSIS_PROMPT } from "@/lib/prompts";
// import {parsed} from "@/lib/data";

interface FontItem {
  text: string;
  family: string;
  size: string;
  weight: string;
  color: string;
}

interface ColorItem {
  code: string;
  name: string;
}

interface AnalysisResponse {
  fonts?: FontItem[];
  colors?: ColorItem[];
}

const Analyze: React.FC = () => {
  const searchParams = useSearchParams();
  const thumbnailUrl = searchParams?.get("thumbnailUrl");
  const router = useRouter();
  const { data } = useSession();
  const { detailItem } = useDetailItem();

  const [fonts, setFonts] = useState<FontItem[]>([]);
  const [colors, setColors] = useState<ColorItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const items = [
    { name: "Font", component: <Font data={fonts} /> },
    { name: "Color", component: <Color data={colors} /> },
    { name: "Background", component: <Background /> },
    { name: "Image", component: <Img /> },
    { name: "Detail", component: <Detail /> },
  ];

  const selectedItem = items.find((item) => item.name === detailItem);

  /**
   * SINGLE optimized API call
   */
  const analyzeThumbnail = useCallback(async () => {
    if (!thumbnailUrl) return;

    setLoading(true);
    try {
      const res = await fetch("/api/analyze-thumbnail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: THUMBNAIL_ANALYSIS_PROMPT,
          img: thumbnailUrl,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result?.data) {
        throw new Error("Invalid AI response");
      }

      const jsonPart = result.data.match(/\{[\s\S]*\}/)?.[0];
      if (!jsonPart) {
        console.error("No JSON found in the response");
        return;
      }
      const parsed = JSON.parse(jsonPart);

      setFonts(parsed.fonts ?? []);
      setColors(parsed.colors ?? []);
    } catch (error) {
      console.log("Thumbnail analysis failed:", error);
    } finally {
      setLoading(false);
    }
  }, [thumbnailUrl]);


  useEffect(() => {
    analyzeThumbnail();
  }, [analyzeThumbnail]);

  async function handleSave() {
    if (!thumbnailUrl) return;

    setIsSaving(true);
    try {
      const response = await fetch("/api/thumbnail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: data?.user?._id,
          imgUrl: thumbnailUrl,
        }),
      });

      if (response.status === 401) {
        router.replace(
          `/sign-in?callbackUrl=${encodeURIComponent(window.location.href)}`
        );
        return;
      }

      const result = await response.json();
      setFeedback(
        result.success ? "Thumbnail saved successfully!" : result.message
      );
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="self-start w-full mt-16 flex dark:bg-neutral-900 border-t">
      <LeftSideBar />

      <div className="w-full px-3 sm:px-5 dark:bg-neutral-900">
        <div className="px-0 md:px-6 py-5 space-y-1">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Analytics of your Thumbnail
          </h3>
          <p className="text-sm text-neutral-400">
            Font, color, background and image analysis.
          </p>
        </div>

        <div className="px-0 md:px-6">
          {thumbnailUrl ? (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="w-full max-w-[400px]">
                  <Image
                    src={thumbnailUrl}
                    alt="Thumbnail"
                    width={400}
                    height={225}
                    className="rounded-sm shadow-lg"
                  />
                </div>

                <div className="w-full max-w-sm max-h-[500px] overflow-y-auto">
                  <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {detailItem} Analysis
                  </h4>
                  {loading ? (
                    <div className="w-full flex flex-col gap-3 my-1">
                      <div className="text-center border py-1 rounded-sm h-9 text-neutral-600 font-medium">
                        ANALYZING...
                      </div>

                      {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="flex flex-col gap-1">
                          <span className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded-sm w-16" />
                          <div className="h-8 bg-neutral-100 dark:bg-neutral-800 rounded-sm" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    selectedItem?.component
                  )}
                </div>
              </div>

              <div className="max-w-[400px]">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full py-1.5 bg-neutral-900 text-white dark:text-neutral-900 dark:bg-white rounded-sm"
                >
                  {isSaving ? "Saving..." : "Save Thumbnail"}
                </button>

                {feedback && (
                  <p className="text-sm text-gray-500 mt-2">{feedback}</p>
                )}
              </div>
            </div>
          ) : (
            <p>No thumbnail URL provided.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default function AnalyzeWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Analyze />
    </Suspense>
  );
}
