"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "../ui/badge";

interface TagsInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function TagsInput({ value = [], onChange }: TagsInputProps) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const newTag = input.trim();
    if (newTag && !value.includes(newTag)) {
      onChange([...value, newTag]);
      setInput("");
    }
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 flex-wrap ">
        {value.map((tag, i) => (
          <Badge
            key={i}
            className="bg-gray-200 px-3 shadow text-black py-1.5 rounded-full flex justify-between items-center gap-2"
          >
            {tag}
            <button
              type="button"
              className=" hover:bg-gray-300 rounded-full px-0.5"
              onClick={() => removeTag(tag)}
            >
              ✕
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
          placeholder="Type and press Enter"
        />
        {/* <Button type="button" onClick={addTag} variant="outline">
          Add
        </Button> */}
      </div>
    </div>
  );
}
