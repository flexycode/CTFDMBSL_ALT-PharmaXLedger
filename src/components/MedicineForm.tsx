import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface MedicineFormProps {
  medicine?: any;
  onSave: () => void;
  onCancel: () => void;
}

const MedicineForm = ({ medicine, onSave, onCancel }: MedicineFormProps) => {
  const [name, setName] = useState(medicine?.name || "");
  const [description, setDescription] = useState(medicine?.description || "");
  const [price, setPrice] = useState(medicine?.price || 0);
  const [category, setCategory] = useState(medicine?.category || "antibiotics");
  const [manufacturer, setManufacturer] = useState(
    medicine?.manufacturer || "TGP Pharma Inc.",
  );
  const [inStock, setInStock] = useState(
    medicine?.in_stock !== undefined ? medicine.in_stock : true,
  );
  const [imageUrl, setImageUrl] = useState(medicine?.image_url || "");
  const [dosage, setDosage] = useState(medicine?.dosage || "");
  const [form, setForm] = useState(medicine?.form || "");
  const [origin, setOrigin] = useState(medicine?.origin || "Philippines");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    setImageFile(file);

    // Create a preview
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImagePreview(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);

    // Upload to Supabase Storage
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Create a unique file name
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `medicine-images/${fileName}`;

      // Upload the file
      const { data, error } = await supabase.storage
        .from("medicines")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
          onUploadProgress: (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            setUploadProgress(percent);
          },
        });

      if (error) {
        throw error;
      }

      // Get the public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("medicines").getPublicUrl(filePath);

      setImageUrl(publicUrl);
    } catch (err: any) {
      console.error("Error uploading image:", err);
      setError(err.message || "Error uploading image");
    } finally {
      setIsUploading(false);
      setUploadProgress(100);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const medicineData = {
        name,
        description,
        price: parseFloat(price.toString()),
        category,
        manufacturer,
        in_stock: inStock,
        image_url: imageUrl,
        dosage,
        form,
        origin,
      };

      let result;

      if (medicine?.id) {
        // Update existing medicine
        result = await supabase
          .from("medicines")
          .update(medicineData)
          .eq("id", medicine.id);
      } else {
        // Insert new medicine
        result = await supabase.from("medicines").insert([medicineData]);
      }

      if (result.error) {
        throw result.error;
      }

      onSave();
    } catch (err: any) {
      setError(err.message || "An error occurred while saving the medicine");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Medicine Name *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (₱) *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="antibiotics">Antibiotics</SelectItem>
              <SelectItem value="painkillers">Painkillers</SelectItem>
              <SelectItem value="cardiovascular">Cardiovascular</SelectItem>
              <SelectItem value="respiratory">Respiratory</SelectItem>
              <SelectItem value="gastrointestinal">Gastrointestinal</SelectItem>
              <SelectItem value="endocrine">Endocrine</SelectItem>
              <SelectItem value="vitamins">Vitamins</SelectItem>
              <SelectItem value="dermatological">Dermatological</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="manufacturer">Manufacturer *</Label>
          <Select value={manufacturer} onValueChange={setManufacturer}>
            <SelectTrigger>
              <SelectValue placeholder="Select manufacturer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TGP Pharma Inc.">TGP Pharma Inc.</SelectItem>
              <SelectItem value="RiteMED Phils. Inc.">
                RiteMED Phils. Inc.
              </SelectItem>
              <SelectItem value="Sandoz Pharmaceuticals">
                Sandoz Pharmaceuticals
              </SelectItem>
              <SelectItem value="Actimed Pharmaceuticals">
                Actimed Pharmaceuticals
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dosage">Dosage</Label>
          <Input
            id="dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            placeholder="e.g., 500mg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="form">Form</Label>
          <Input
            id="form"
            value={form}
            onChange={(e) => setForm(e.target.value)}
            placeholder="e.g., Tablet, Capsule"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="origin">Origin</Label>
          <Input
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="e.g., Philippines"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUpload">Medicine Image</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <span className="text-xs text-muted-foreground">
                (or upload an image)
              </span>
            </div>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              disabled={isUploading}
            />
          </div>
          <div>
            <Label htmlFor="imageUpload">Upload Image</Label>
            <div className="mt-1 flex items-center gap-2">
              <Input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="flex-1"
                disabled={isUploading}
              />
              {isUploading && (
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-2 border rounded-md p-2 max-w-xs">
            <p className="text-xs text-muted-foreground mb-1">Preview:</p>
            <img
              src={imagePreview}
              alt="Medicine preview"
              className="max-h-32 object-contain mx-auto"
            />
          </div>
        )}

        {!imageUrl && !imageFile && (
          <div className="mt-2 p-2 bg-red-50 text-red-700 rounded-md text-sm">
            Please provide either an image URL or upload an image file.
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="inStock" checked={inStock} onCheckedChange={setInStock} />
        <Label htmlFor="inStock">In Stock</Label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : medicine?.id
              ? "Update Medicine"
              : "Add Medicine"}
        </Button>
      </div>
    </form>
  );
};

export default MedicineForm;
