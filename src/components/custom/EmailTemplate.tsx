import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useConvex } from "convex/react";
import { useUserDetail } from "@/app/provider";
import { api } from "../../../convex/_generated/api";
import { EmailTemplateItem } from "@/lib/dto";

export default function EmailTemplate() {
  const [emailList, setEmailList] = useState<EmailTemplateItem[]>([]);
  const convex = useConvex();
  const { userDetail } = useUserDetail();

  useEffect(() => {
    if (userDetail && userDetail.email) {
      GetTemplateList();
    }
  }, [userDetail]);

  const GetTemplateList = async () => {
    try {
      if (!userDetail?.email) return;
      const result = await convex.query(api.emailTemplate.GetAllUserTemplate, {
        email: userDetail?.email,
      });
      setEmailList(result);
    } catch (error) {
      console.error("Error fetching email templates:", error);
    }
  };
  return (
    <div>
      <h2 className="font-bold text-xl dark:text-white text-green-800 mt-6">
        Email Templates
      </h2>
      {emailList?.length == 0 ? (
        <div className="flex justify-center mt-7 flex-col items-center m">
          <Image src={"/email.png"} alt="email" width={250} height={250} />
          <Link href={"/dashboard/create"}>
            <Button className="mt-7 bg-green-700 dark:bg-green-400">
              + Create New
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {emailList?.map((item, index) => (
            <div key={index} className="p-5 shadow-lg rounded-md border">
              <Image src={"/email.png"} alt="email" width={200} height={200} />
              <h2 className="mt-2">{item.description}</h2>
              <Link href={"/editor/" + item.tId}>
                <Button className="mt-2 w-full">View/Edit</Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
