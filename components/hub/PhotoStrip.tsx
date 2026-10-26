import Reveal from "@/components/ui/Reveal";

const PHOTOS = [
  {
    src: "/assets/photos/siswa-sedang-belajar.jpg",
    alt: "Siswa berseragam biru tertawa di dalam kelas",
    caption: "Kelas hari ini",
    width: 1920,
    height: 1280,
  },
  {
    src: "/assets/photos/murid-menulis-labkom.jpg",
    alt: "Dua siswa menulis catatan di meja lab komputer",
    caption: "Catat di lab",
    width: 1920,
    height: 1440,
  },
  {
    src: "/assets/photos/belajar-kelompok.jpg",
    alt: "Siswa duduk melingkar mengerjakan tugas kelompok di meja kayu",
    caption: "Belajar kelompok",
    width: 1920,
    height: 1280,
  },
  {
    src: "/assets/photos/foto-siswa-sedang-belajar.jpg",
    alt: "Proyektor menyala di ruang kelas yang penuh siswa",
    caption: "Ruang kelas",
    width: 1920,
    height: 1440,
  },
];

const CREDITS = [
  {
    title: "A classroom with students at the College of Medicine, FUASK",
    creator: "Kambai Akau",
    license: "CC BY-SA 4.0",
    url: "https://commons.wikimedia.org/wiki/File:A_classroom_with_students_at_the_College_of_Medicine,_FUASK.jpg",
  },
  {
    title: "Siswa sedang belajar",
    creator: "Dicky Herlambang",
    license: "CC0",
    url: "https://commons.wikimedia.org/wiki/File:Siswa_sedang_belajar.jpg",
  },
  {
    title: "Murid Menulis Labkom",
    creator: "Yohanadisetiawanbjn",
    license: "CC BY-SA 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Murid_Menulis_Labkom.jpg",
  },
  {
    title: "Belajar Kelompok",
    creator: "Galeri ega",
    license: "CC BY-SA 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Belajar_Kelompok.jpg",
  },
  {
    title: "Foto siswa sedang belajar",
    creator: "Dicky Herlambang",
    license: "CC0",
    url: "https://commons.wikimedia.org/wiki/File:Foto_siswa_sedang_belajar.jpg",
  },
];

export default function PhotoStrip() {
  return (
    <section className="section" aria-labelledby="momen-title">
      <Reveal>
        <div className="section-head">
          <div>
            <h2 id="momen-title">Momen kelas</h2>
            <p>Foto contoh sementara. Foto asli kelas menyusul.</p>
          </div>
          <span className="section-side">4 foto</span>
        </div>
      </Reveal>

      <Reveal className="strip" delay={80}>
        {PHOTOS.map((photo, index) => (
          <figure
            className="shot"
            key={photo.src}
            data-tape={index === 0 || index === 2}
          >
            <div className="shot-frame">
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </Reveal>
    </section>
  );
}

export function PhotoCredits() {
  return (
    <details className="credits">
      <summary>Kredit foto</summary>
      <ul>
        {CREDITS.map((credit) => (
          <li key={credit.url}>
            <a href={credit.url} target="_blank" rel="noopener noreferrer">
              {credit.title}
            </a>{" "}
            oleh {credit.creator}, {credit.license}, via Wikimedia Commons.
          </li>
        ))}
      </ul>
      <p className="credits-note">
        Foto contoh sementara, akan diganti foto kelas asli.
      </p>
    </details>
  );
}
