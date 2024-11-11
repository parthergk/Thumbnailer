"use client";

import LeftSideBar from "@/components/LeftSideBar";
import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Font from "@/components/resourcesItem/Font";

const Analyze: React.FC = () => {
  const searchParams = useSearchParams();
  const thumbnailUrl = searchParams.get('thumbnailUrl');

  return (
    <main className="self-start w-full mt-16 flex">
      <LeftSideBar />
      <Card className="w-full px-5">
        <CardHeader>
          <CardTitle>Analyze your thumbnail</CardTitle>
          <p className="text-sm text-gray-400">Get details about this thumbnail like font, color, background, etc.</p>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-5 gap-5">
            {thumbnailUrl ? (
              <>
                <Image
                  src={thumbnailUrl}
                  alt="Thumbnail"
                  width={373}
                  height={305}
                  className="w-full rounded"
                  style={{ maxWidth: '373px', maxHeight: '305px' }}
                  loading="lazy"
                />
                <div className=" h-full w-full max-w-sm ">
                  <h1 className=" text-lg font-semibold">Font</h1>
                  <Font/>
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

export default Analyze;
