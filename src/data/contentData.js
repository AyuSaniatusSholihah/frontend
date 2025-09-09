// Sample learning content
export const learningContent = [
  {
    id: 1,
    title: "Mengenal Kubus",
    shape: "cube",
    content: "Halo sahabat! Hari ini kita akan belajar tentang kubus. Kubus adalah bangun ruang yang semua sisinya sama panjang. Kubus punya 6 sisi, semuanya berbentuk persegi. Kubus punya 12 rusuk, yaitu garis tepi pada tiap sisi. Kubus punya 8 titik sudut, yaitu tempat bertemunya rusuk-rusuk. Bayangkan kamu memegang dadu. Nah, dadu itu adalah contoh nyata dari kubus. Kamu bisa meraba buku pop-up atau model kubus untuk merasakan sisinya yang sama besar. Klik lanjut dibagian bawah untuk menuju halaman berikutnya.",
    buttonText: "Klik lanjut untuk menuju hal berikutnya"
  },
  {
    id: 2,
    title: "Mengenal Balok",
    shape: "cuboid", // We'll modify this to look like a rectangular prism
    content: "Halo sahabat! Sekarang kita belajar tentang balok. Balok hampir mirip kubus, tapi tidak semua sisinya sama panjang. Balok punya 6 sisi, terdiri dari 3 pasang sisi yang sama besar. Balok punya 12 rusuk dan 8 titik sudut, sama seperti kubus. Contoh balok di sekitar kita adalah kotak pensil atau lemari buku. Silakan raba buku pop-up untuk merasakan bentuk balok yang lebih panjang.",
    buttonText: "Klik lanjut untuk menuju hal berikutnya"
  },
  {
    id: 3,
    title: "Mengenal Bola",
    shape: "sphere",
    content: "Halo sahabat! Sekarang kita belajar tentang bola. Bola adalah bangun ruang yang seluruh permukaannya melengkung. Bola tidak punya rusuk dan tidak punya titik sudut. Bola punya titik pusat (pusat bola), dan dari pusat ke permukaan kita sebut jari-jari. Garis dari satu titik di permukaan melewati pusat ke titik seberangnya disebut diameter. Contoh bola di sekitar kita adalah bola sepak atau jeruk. Coba raba buku pop-up untuk merasakan bentuk bulat dari bola.",
    buttonText: "Selesai belajar"
  },
  {
    id: 4,
    title: "Mengenal Prisma Segitiga",
    shape: "triangularPrism",
    content: "Halo sahabat! Sekarang kita belajar tentang prisma segitiga. Prisma segitiga adalah bangun ruang yang memiliki alas berbentuk segitiga dan dua sisi tegak berbentuk persegi panjang. Prisma segitiga punya 5 sisi, 9 rusuk, dan 6 titik sudut. Contoh prisma segitiga di sekitar kita adalah atap rumah yang berbentuk segitiga. Coba raba buku pop-up untuk merasakan bentuk prisma segitiga.",
    buttonText: "Selesai belajar"
  },
  {
    id: 5,
    title: "Mengenal Kerucut",
    shape: "cone",
    content: "Halo sahabat! Sekarang kita belajar tentang kerucut. Kerucut adalah bangun ruang yang memiliki alas berbentuk lingkaran dan satu titik puncak. Kerucut punya 1 sisi lengkung dan 1 sisi datar (alas). Contoh kerucut di sekitar kita adalah topi pesta atau es krim. Coba raba buku pop-up untuk merasakan bentuk kerucut.",
    buttonText: "Selesai belajar"
  },
  {
    id: 6,
    title: "Mengenal Limas Segitiga",
    shape: "triangularPrism",
    content: "Halo sahabat! Sekarang kita belajar tentang limas segitiga. Limas segitiga adalah bangun ruang yang memiliki alas berbentuk segitiga dan tiga sisi tegak berbentuk segitiga. Limas segitiga punya 4 sisi, 6 rusuk, dan 4 titik sudut. Contoh limas segitiga di sekitar kita adalah atap rumah yang berbentuk segitiga. Coba raba buku pop-up untuk merasakan bentuk limas segitiga.",
    buttonText: "Selesai belajar"
  },
  {
    id: 7,
    title: "Mengenal Limas Segiempat",
    shape: "quadrilateralPrism",
    content: "Halo sahabat! Sekarang kita belajar tentang limas segiempat. Limas segiempat adalah bangun ruang yang memiliki alas berbentuk segiempat dan empat sisi tegak berbentuk segitiga. Limas segiempat punya 5 sisi, 8 rusuk, dan 5 titik sudut. Contoh limas segiempat di sekitar kita adalah atap rumah yang berbentuk segiempat. Coba raba buku pop-up untuk merasakan bentuk limas segiempat.",
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
    correctAnswer: "dua belas ",
    explanation: "Kubus memiliki 12 rusuk yang menghubungkan titik-titik sudutnya."
  },
    {
  id: 3,
  level: "Level 2: Membedakan Sifat Bangun Ruang",
  question: "Aku sering dianggap kembar dengan Kubus. Kami sama-sama punya 6 sisi, 8 titik sudut, dan 12 rusuk. Yang membedakan kami adalah, sisi-sisiku tidak selalu sama besar. Apakah aku kubus, balok, bola, kerucut, jawab dengan benar?",
  image: "cuboid",
  answers: ["balok", "cuboid"],
  correctAnswer: "balok",
  explanation: "Balok dan Kubus sama-sama memiliki 6 sisi, 8 titik sudut, dan 12 rusuk. Namun, semua sisi Kubus berbentuk persegi yang sama besar, sedangkan sisi Balok berbentuk persegi panjang."
}
];