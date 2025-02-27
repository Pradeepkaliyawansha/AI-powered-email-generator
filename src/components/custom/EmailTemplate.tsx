import Image from "next/image";
import { Button } from "../ui/button";

export default function EmailTemplate() {
  // const { emailList, setEmailList } = useState();

  return (
    <div>
      <h2 className="font-bold text-xl dark:text-white text-green-800 mt-6">
        Email Templates
      </h2>
      {/* {emailList?.length == 0 && ( */}
      <div className="flex justify-center mt-7 flex-col items-center m">
        <Image src={"/email.png"} alt="email" width={250} height={250} />
        <Button className="mt-7 bg-green-700 dark:bg-green-400">
          + Create New
        </Button>
      </div>
      {/* )} */}
    </div>
  );
}
