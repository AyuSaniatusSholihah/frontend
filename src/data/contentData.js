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
  level: "Level 2: Membedakan Sifat Bangun Ruang",
  question: "Aku sering dianggap kembar dengan Kubus. Kami sama-sama punya 6 sisi, 8 titik sudut, dan 12 rusuk. Yang membedakan kami adalah, sisi-sisiku tidak selalu sama besar. Apakah aku kubus, balok, bola, kerucut, jawab dengan benar?",
  image: "cuboid",
  answers: ["balok", "cuboid"],
  correctAnswer: "balok",
  explanation: "Balok dan Kubus sama-sama memiliki 6 sisi, 8 titik sudut, dan 12 rusuk. Namun, semua sisi Kubus berbentuk persegi yang sama besar, sedangkan sisi Balok berbentuk persegi panjang."
}
];