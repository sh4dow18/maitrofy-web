// Set this component as a client component
"use client";
// Admin Form Requirements
import { FormEvent } from "react";
import Form from "./form";
// Admin Form Props
interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
  submitButton: string;
  OnSubmit: (event: FormEvent<HTMLFormElement>) => Promise<Response>;
  messages: {
    success: string;
    loading: string;
    error?: string;
  };
}
// Admin Form Main Function
function AdminForm({
  title,
  description,
  children,
  submitButton,
  OnSubmit,
  messages,
}: Props) {
  return (
    // Admin Form Main Container
    <div className="flex flex-col gap-5 bg-gray-900 border-b border-gray-400/70 rounded-lg p-6 w-full">
      {/* Admin Form Main Information Container */}
      <section className="flex flex-col gap-1">
        {/* Admin Form Main Information Title */}
        <span className="font-semibold text-xl text-gray-200">{title}</span>
        {/* Admin Form Main Information Description */}
        <span className="text-gray-300 font-medium">{description}</span>
      </section>
      {/* Admin Form Main Form */}
      <Form submitButton={submitButton} OnSubmit={OnSubmit} messages={messages}>
        {children}
      </Form>
    </div>
  );
}

export default AdminForm;
