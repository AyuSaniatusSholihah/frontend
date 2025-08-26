// Sample learning content
export const learningContent = [
  {
    id: 1,
    title: "Mengenal Kubus",
    shape: "cube",
    content: "Hai kawan, sekarang kita belajar bangun ruang kubus, namun sebelumnya kawan bisa membuka e-mathblindnya pada hal 1 untuk mengetahui bentuk kubus sudah siap, selamat belajar... Kubus mempunyai 6 sisi sama panjang, memiliki 12 rusuk, memiliki 8 titik sudut. Contoh kubus yaitu dadu yang digunakan main ular tangga",
    buttonText: "Ucapkan lanjut untuk menuju hal berikutnya"
  },
  {
    id: 2,
    title: "Mengenal Balok",
    shape: "cube", // We'll modify this to look like a rectangular prism
    content: "Balok adalah bangun ruang yang memiliki 6 sisi berbentuk persegi panjang. Balok memiliki 12 rusuk dan 8 titik sudut, sama seperti kubus. Perbedaannya adalah sisi-sisi balok tidak semuanya sama besar. Contoh balok yaitu kotak sepatu atau lemari es.",
    buttonText: "Ucapkan lanjut untuk menuju hal berikutnya"
  },
  {
    id: 3,
    title: "Mengenal Bola",
    shape: "sphere",
    content: "Bola adalah bangun ruang yang memiliki permukaan melengkung. Semua titik pada permukaan bola memiliki jarak yang sama terhadap titik pusat. Bola tidak memiliki rusuk atau titik sudut. Contoh bola yaitu bola sepak, bola basket, atau kelereng.",
    buttonText: "Selesai belajar"
  }
];

export const quizData = [
  {
    id: 1,
    level: "Level 1: Tebak Bangun Ruang",
    question: "Bangun ruang apa yang memiliki 6 sisi yang sama besar?",
    image: "cube",
    answers: ["kubus", "cube", "6 sisi"],
    correctAnswer: "kubus",
    explanation: "Kubus memiliki 6 sisi sama besar, 12 rusuk, dan 8 titik sudut."
  },
  {
    id: 2,
    level: "Level 1: Tebak Bangun Ruang",
    question: "Berapa jumlah rusuk kubus?",
    image: "cube",
    answers: ["12", "dua belas", "duabelas"],
    correctAnswer: "12",
    explanation: "Kubus memiliki 12 rusuk yang menghubungkan titik-titik sudutnya."
  },
  {
    id: 3,
    level: "Level 2: Tebak Bangun Ruang dari Kumpulan Objek",
    question: "Dari kumpulan objek berikut, manakah yang berbentuk bola?",
    image: "sphere",
    answers: ["bola", "sphere", "bulat"],
    correctAnswer: "bola",
    explanation: "Bola adalah bangun ruang yang semua titik pada permukaannya berjarak sama dari pusat."
  }
];