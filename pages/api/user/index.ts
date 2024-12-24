import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log("Server API call");
  res.status(200).json({ message: "Hello from Next.js Backend!" });

}
