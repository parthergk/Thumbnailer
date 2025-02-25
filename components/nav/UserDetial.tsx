import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, AtSign, Mail } from "lucide-react";
import { signOut } from "next-auth/react";

interface UserDetailProps {
  isUser: boolean;
  data?: {
    _id?: string;
    name?: string | null;
    username?: string;
    email?: string | null;
    image?: string | null;
  };
}

const UserDetial: React.FC<UserDetailProps> = ({ isUser, data }) => {
  return (
    <Card
      className={`${
        isUser ? "absolute" : "hidden"
      } w-64 absolute top-16 right-0 shadow-lg`}
    >
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-8 w-8 text-gray-500" />
            </div>
          </div>
          <div className="space-y-2 text-center">
            <h3 className="font-semibold text-lg">{data?.name || "Guest"}</h3>
            <div className="flex items-center justify-center gap-1.5 text-sm text-gray-600">
              <AtSign className="h-3.5 w-3.5" />
              <span>{data?.username}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-sm text-gray-600">
              <Mail className="h-3.5 w-3.5" />
              <span>{data?.email || "N/A"}</span>
            </div>
          </div>
          <div className="pt-2 flex flex-col justify-center items-center space-y-4">
            <Button className="w-full">
              <a href="/saved-thumbnails">View Saved Thumbnails</a>
            </Button>
            <Button className="w-full" onClick={() => signOut()}>
              Sign Out
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDetial;
