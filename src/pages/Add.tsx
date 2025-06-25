import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";

export default function Add() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle file upload logic here
    console.log("Uploading:", { file: selectedFile, title, description });
    // Redirect back to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-am-cream">
      <Header />

      <main className="p-6 max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6 text-am-dark hover:bg-white/50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
        </Button>

        <h1 className="text-2xl font-bold text-am-dark mb-8">Add your file</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-xl p-12 transition-colors ${
              dragActive
                ? "border-am-blue bg-am-blue/5"
                : "border-gray-300 bg-white"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              accept="video/*,image/*,.pdf,.doc,.docx,.ppt,.pptx"
              className="hidden"
            />

            <div className="text-center cursor-pointer">
              {selectedFile ? (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-am-blue mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-am-dark">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">Click to change file</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-am-dark rounded-full flex items-center justify-center mx-auto">
                    <Plus className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-am-dark">
                      Add or drag a file
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Supports videos, images, documents, and presentations
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Fields */}
          {selectedFile && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter content title..."
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your content..."
                  className="mt-1"
                  rows={4}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-am-blue hover:bg-am-blue/90 text-white"
              >
                Upload Content
              </Button>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
