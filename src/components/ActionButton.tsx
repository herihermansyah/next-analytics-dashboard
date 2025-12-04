"use client"
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import React from "react";

function ActionButton({params, url}: {params: number | string, url: string}) {
  const router = useRouter();
  return <Button className="cursor-pointer" onClick={() => router.push(`/${url}/${params}`)}>Read</Button>;
}

export default ActionButton;
