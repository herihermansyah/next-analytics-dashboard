import React from "react";
import {Button} from "./ui/button";
import {useRouter} from "next/navigation";

function ButtonBack() {
  const router = useRouter();

  return (
    <Button className="cursor-pointer" onClick={() => router.back()}>
      back
    </Button>
  );
}

export default ButtonBack;
