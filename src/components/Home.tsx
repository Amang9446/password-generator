"use client";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

interface PasswordOptions {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

function generatePassword(length: number, options: PasswordOptions): string {
  const charset = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
  };

  const getRandomChar = (str: string) =>
    str[Math.floor(Math.random() * str.length)];

  const selectedCharsets = Object.entries(charset)
    .filter(([key]) => options[key as keyof PasswordOptions])
    .map(([, value]) => value);

  const allChars = selectedCharsets.join("");
  const requiredChars = selectedCharsets.map(getRandomChar);

  const remainingLength = length - requiredChars.length;
  const randomChars = Array.from({ length: remainingLength }, () =>
    getRandomChar(allChars)
  );

  return shuffleArray([...requiredChars, ...randomChars]).join("");
}

function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

export default function Home() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const handleGenerate = () => {
    if (!uppercase && !lowercase && !numbers && !symbols) {
      toast.error("Please select at least one character type.");
      return;
    }
    if (length < 4) {
      toast.error("Password length must be at least 4.");
      return;
    }
    const newPassword = generatePassword(length, {
      uppercase,
      lowercase,
      numbers,
      symbols,
    });
    setPassword(newPassword);
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLength = parseInt(e.target.value);
    if (newLength < 4) {
      toast.error("Password length must be at least 4.");
      setLength(4);
    } else {
      setLength(newLength);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Password Generator</CardTitle>
          <CardDescription>
            Generate a secure password with customizable options.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="length">Length</Label>
            <Input
              id="length"
              type="number"
              min="4"
              max="64"
              value={length}
              onChange={handleLengthChange}
              className="h-8"
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label className="flex items-center gap-2">
              <Checkbox
                id="uppercase"
                checked={uppercase}
                onCheckedChange={(checked) => setUppercase(Boolean(checked))}
              />
              Uppercase
            </Label>
            <Label className="flex items-center gap-2">
              <Checkbox
                id="lowercase"
                checked={lowercase}
                onCheckedChange={(checked) => setLowercase(Boolean(checked))}
              />
              Lowercase
            </Label>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label className="flex items-center gap-2">
              <Checkbox
                id="numbers"
                checked={numbers}
                onCheckedChange={(checked) => setNumbers(Boolean(checked))}
              />
              Numbers
            </Label>
            <Label className="flex items-center gap-2">
              <Checkbox
                id="symbols"
                checked={symbols}
                onCheckedChange={(checked) => setSymbols(Boolean(checked))}
              />
              Symbols
            </Label>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-center gap-4">
            <div className="flex items-center gap-2">
              <Textarea
                id="password"
                readOnly
                className="h-8 cursor-pointer"
                value={password}
              />
              <Button
                type="button"
                variant="outline"
                className="h-8 px-4 text-sm"
                onClick={() => {
                  if (password) {
                    navigator.clipboard.writeText(password);
                    toast.success("Password copied to Clipboard");
                  }
                }}
              >
                Copy
              </Button>
            </div>
            <Button
              type="button"
              variant="outline"
              className="h-8 px-4 text-sm"
              onClick={handleGenerate}
            >
              Generate
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Created by Aman</p>
          <Link
            href="https://github.com/Amang9446/password-generator"
            className="text-sm text-primary hover:underline"
            prefetch={false}
          >
            Learn more
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
