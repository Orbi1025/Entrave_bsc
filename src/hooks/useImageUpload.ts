import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface ImageUploadResult {
  url: string;
  path: string;
  error?: string;
}

export interface UseImageUploadReturn {
  uploadImage: (file: File, userId?: string) => Promise<ImageUploadResult>;
  deleteImage: (path: string) => Promise<boolean>;
  isUploading: boolean;
  error: string | null;
}

/**
 * Hook pour gérer le téléchargement d'images vers Supabase Storage
 */
export function useImageUpload(): UseImageUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Télécharge une image vers Supabase Storage
   * @param file - Fichier image à télécharger
   * @param userId - ID de l'utilisateur (optionnel, pour organiser les fichiers)
   * @returns URL publique de l'image téléchargée
   */
  const uploadImage = async (file: File, userId?: string): Promise<ImageUploadResult> => {
    setIsUploading(true);
    setError(null);

    try {
      // Validation du fichier
      if (!file) {
        throw new Error('No file selected');
      }

      // Vérifier le type de fichier
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Unsupported file type. Please use JPEG, PNG, GIF or WebP.');
      }

      // Vérifier la taille du fichier (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        throw new Error('File is too large. Maximum size: 5MB.');
      }

      // Générer un nom de fichier unique
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileExtension = file.name.split('.').pop();
      const fileName = `${timestamp}_${randomString}.${fileExtension}`;

      // Créer le chemin de stockage
      const folderPath = userId ? `${userId}/` : 'public/';
      const filePath = `${folderPath}${fileName}`;

      // Télécharger le fichier
      const { data, error: uploadError } = await supabase.storage
        .from('market-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Obtenir l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from('market-images')
        .getPublicUrl(filePath);

      return {
        url: publicUrl,
        path: filePath
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error uploading image';
      setError(errorMessage);
      return {
        url: '',
        path: '',
        error: errorMessage
      };
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Supprime une image de Supabase Storage
   * @param path - Chemin de l'image à supprimer
   * @returns true si la suppression a réussi
   */
  const deleteImage = async (path: string): Promise<boolean> => {
    try {
      const { error } = await supabase.storage
        .from('market-images')
        .remove([path]);

      if (error) {
        console.error('Erreur lors de la suppression:', error);
        return false;
      }

      return true;
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      return false;
    }
  };

  return {
    uploadImage,
    deleteImage,
    isUploading,
    error
  };
}

/**
 * Hook pour prévisualiser une image avant téléchargement
 */
export function useImagePreview() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const createPreview = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return url;
    }
    return null;
  };

  const clearPreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  return {
    previewUrl,
    createPreview,
    clearPreview
  };
}

/**
 * Utilitaires pour la gestion des images
 */
export const imageUtils = {
  /**
   * Valide un fichier image
   */
  validateImageFile: (file: File): { isValid: boolean; error?: string } => {
    if (!file) {
      return { isValid: false, error: 'No file selected' };
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return { isValid: false, error: 'Unsupported file type' };
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return { isValid: false, error: 'File too large (max 5MB)' };
    }

    return { isValid: true };
  },

  /**
   * Redimensionne une image côté client (optionnel)
   */
  resizeImage: (file: File, maxWidth: number = 800, maxHeight: number = 600): Promise<File> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculer les nouvelles dimensions
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Dessiner l'image redimensionnée
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            resolve(resizedFile);
          } else {
            reject(new Error('Erreur lors du redimensionnement'));
          }
        }, file.type, 0.8);
      };

      img.onerror = () => reject(new Error('Erreur lors du chargement de l\'image'));
      img.src = URL.createObjectURL(file);
    });
  },

  /**
   * Convertit une URL en fichier (pour les cas où on veut récupérer une image existante)
   */
  urlToFile: async (url: string, filename: string): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  }
};
