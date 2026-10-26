import type { Metadata } from "next";
import PhotoGallery from "@/components/gallery/PhotoGallery";

export const metadata: Metadata = {
  title: "Galeri Kelas — 11TKJ1",
  description:
    "Galeri foto kelas 11TKJ1. Arahkan kursor untuk menajamkan, klik untuk memperbesar.",
};

export default function GaleriPage() {
  return <PhotoGallery />;
}
