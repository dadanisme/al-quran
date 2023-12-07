interface Surah {
  nomor: number;
  nama: string;
  nama_latin: string;
  jumlah_ayat: number;
  tempat_turun: string;
  arti: string;
  deskripsi: string;
  audio: string;
}

interface Ayat {
  id: number;
  surah: number;
  nomor: number;
  ar: string;
  tr: string;
  idn: string;
  tafsir: string;
}

interface SurahData {
  nomor: number;
  nama: string;
  nama_latin: string;
  jumlah_ayat: number;
  tempat_turun: string;
  arti: string;
  deskripsi: string;
  audio: string;
  status: boolean;
  ayat: Ayat[];
  surat_selanjutnya?: (Surah & { id: number }) | false;
  surat_sebelumnya?: (Surah & { id: number }) | false;
}

interface TafsirData {
  status: boolean;
  nomor: number;
  nama: string;
  nama_latin: string;
  jumlat_ayat: number;
  tempat_turun: string;
  arti: string;
  deskripsi: string;
  audio: string;
  tafsir: Tafsir[];
  surat_selanjutnya?: (Surah & { id: number }) | false;
  surat_sebelumnya?: (Surah & { id: number }) | false;
}

interface Tafsir {
  id: number;
  surah: number;
  ayat: number;
  tafsir: string;
}
