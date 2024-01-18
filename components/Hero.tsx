"use client";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { response } from "express";

export default function Hero() {
  const [code, setCode] = useState("");
  const [newCode, setNewCode] = useState("");
  const { toast } = useToast();
  const checkCode = async () => {
    const res = await fetch(
      "https://code-generator-eight.vercel.app/code/uses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: newCode }),
      }
    );
    const response = await res.json();
    if (response.error) {
      toast({
        title: response.error,
        variant: "destructive",
      });
    } else
      toast({
        title: response.message,
      });
  };
  const generateCode = async () => {
    const res = await fetch("https://code-generator-eight.vercel.app/code");
    const data = await res.json();
    if (res.status === 201) {
      toast({
        title: "Code created succesfully",
      });
    } else {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
    setCode(data.Code.code);
  };
  return (
    <section className="w-full bg-[#f5f5f5] pt-12 md:pt-24 lg:pt-32">
      <div className="container space-y-10 xl:space-y-16">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Welcome to Code Generator
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Generate a unique code and enter it in the field below to verify.
            </p>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Generate Code</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Button className="w-full" onClick={generateCode}>
                Generate New Code
              </Button>
              <div className="w-full h-10 bg-white rounded-md flex items-center justify-center text-lg font-bold">
                {code}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Enter Code</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Input
                className="w-full"
                id="code"
                placeholder="Enter your code"
                onChange={(e) => setNewCode(e.target.value)}
              />
              <Button className="w-full" onClick={checkCode}>
                Check Code
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
