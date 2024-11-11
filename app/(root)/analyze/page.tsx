"use client"
import LeftSideBar from "@/components/LeftSideBar";
import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
const Analyze = () => {
  const searchParams = useSearchParams();
  const thumbnailUrl = searchParams.get('thumbnailUrl');
  return (
    <main className=" self-start w-full mt-16 flex">
      <LeftSideBar />

      <Card className="w-full px-5">
        <CardHeader>
          <CardTitle>Analyze your thumbnail</CardTitle>
        <p className=" text-sm text-gray-400">Get details about this thumbnail like font, color, background etc.</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Image
              src={thumbnailUrl}
              alt={`Thumbnail`}
              width={373}
              height={305}
              className="w-full rounded"
              style={{ maxWidth: '373px', maxHeight: '305px' }}
              // placeholder="blur" // Optional: add if you want a blur effect while loading
              loading="lazy"
            />

          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default Analyze