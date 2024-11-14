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
import { textData } from '@/lib/constant/data';
import { aiApi } from "@/lib/actions/aiApi.action";
import { useEffect, useState } from "react";
import {DETAILED_FONT_PROMPT} from '@/lib/prompts'

const Analyze: React.FC = () => {
  const searchParams = useSearchParams();
  const thumbnailUrl = searchParams.get('thumbnailUrl');
  const { detailItem } = useDetailItem();
  const [textDataorg, setTextDataorg] = useState([]);

  

  const items = [
    { name: "Font", component: <Font data={textDataorg} /> },
    { name: "Background", component: <Background /> },
    { name: "Color", component: <Color /> },
    { name: "Image", component: <Img /> },
    { name: "Detail", component: <Detail /> },
  ];

  const selectedItem = items.find((item) => item.name === detailItem);

  useEffect(()=>{
    apicall()

  },[thumbnailUrl])

  const apicall = async ()=>{
    const data =  await aiApi({ prompt: DETAILED_FONT_PROMPT, img: thumbnailUrl });
    const jsonresponse = data.replace(/```json|```/g, '');
    const respone = JSON.parse(jsonresponse); 
    // console.log("data", respone.fonts)
    setTextDataorg(respone.fonts);
    
  }


  return (
    <main className="self-start w-full mt-16 flex">
      <LeftSideBar />
      <Card className="w-full px-5">
        <CardHeader>
          <CardTitle>Analyze your thumbnail</CardTitle>
          <p className="text-sm text-gray-400">
            Get details about this thumbnail like font, color, background, etc.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-5 gap-5">
            {thumbnailUrl ? (
              <>
              <div className=" w-[423px] h-[355px]">
                <Image
                  src={thumbnailUrl}
                  alt="Thumbnail"
                  width={373}
                  height={305}
                  className="w-full rounded"
                  loading="lazy"
                />
                </div>
                <div className="h-full w-full max-w-sm">
                  <h1 className="text-lg font-semibold">{detailItem} Analysis</h1>
                  {selectedItem ? selectedItem.component : 'No Data'}
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
