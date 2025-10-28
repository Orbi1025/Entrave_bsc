import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';
import { useImageUpload, useImagePreview, imageUtils } from '@/hooks/useImageUpload';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageSelect: (url: string) => void;
  currentImage?: string;
  className?: string;
  disabled?: boolean;
}

export function ImageUpload({ onImageSelect, currentImage, className, disabled }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const { uploadImage, isUploading, error } = useImageUpload();
  const { previewUrl, createPreview, clearPreview } = useImagePreview();

  const handleFileSelect = async (file: File) => {
    // Validation du fichier
    const validation = imageUtils.validateImageFile(file);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    // Créer la prévisualisation
    createPreview(file);

    // Télécharger l'image
    const result = await uploadImage(file);
    
    if (result.error) {
      alert(result.error);
      clearPreview();
      return;
    }

    // Notifier le composant parent
    onImageSelect(result.url);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleRemoveImage = () => {
    clearPreview();
    onImageSelect('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const displayImage = previewUrl || currentImage;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Zone de téléchargement */}
      <Card
        className={cn(
          'border-2 border-dashed transition-colors cursor-pointer',
          dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25',
          disabled && 'opacity-50 cursor-not-allowed',
          displayImage && 'border-solid'
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <div className="p-8 text-center">
          {displayImage ? (
            <div className="space-y-4">
              <div className="relative inline-block">
                <img
                  src={displayImage}
                  alt="Market preview"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
                {!disabled && (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Click to change image
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                {isUploading ? (
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <div>
                <p className="text-lg font-medium">
                  {isUploading ? 'Uploading...' : 'Add an image'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Drag and drop or click to select
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  PNG, JPG, GIF, WebP (max 5MB)
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Input caché */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
      />

      {/* Message d'erreur */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <AlertCircle className="w-4 h-4 text-destructive" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Bouton de téléchargement alternatif */}
      {!displayImage && !isUploading && (
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="w-full"
        >
          <Upload className="w-4 h-4 mr-2" />
          Select an image
        </Button>
      )}
    </div>
  );
}

/**
 * Composant simplifié pour la sélection d'image avec prévisualisation
 */
interface SimpleImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  placeholder?: string;
  className?: string;
}

export function SimpleImageUpload({ value, onChange, placeholder, className }: SimpleImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, isUploading } = useImageUpload();
  const { previewUrl, createPreview, clearPreview } = useImagePreview();

  const handleFileSelect = async (file: File) => {
    const validation = imageUtils.validateImageFile(file);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    createPreview(file);
    const result = await uploadImage(file);
    
    if (result.error) {
      alert(result.error);
      clearPreview();
      return;
    }

    onChange(result.url);
  };

  const displayImage = previewUrl || value;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          {isUploading ? 'Uploading...' : 'Image'}
        </Button>
        
        {displayImage && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              clearPreview();
              onChange('');
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {displayImage && (
        <div className="relative">
          <img
            src={displayImage}
            alt="Preview"
            className="w-20 h-20 object-cover rounded border"
          />
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
        className="hidden"
      />
    </div>
  );
}
