"use client";

import React, { Suspense } from "react";
import Todo from "@/components/Todo";

export default function TodoPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Todo />
    </Suspense>
  );
}
