import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting database seeding...");

  // 1. Create or find four genres
  const fiction = await prisma.genre.upsert({
    where: { name: "Fiction" },
    update: {},
    create: {
      name: "Fiction",
      description: "Imaginative stories and novels.",
    },
  });

  const science = await prisma.genre.upsert({
    where: { name: "Science" },
    update: {},
    create: {
      name: "Science",
      description: "Scientific discoveries and knowledge.",
    },
  });

  const technology = await prisma.genre.upsert({
    where: { name: "Technology" },
    update: {},
    create: {
      name: "Technology",
      description: "Computers, programming and modern technology.",
    },
  });

  const history = await prisma.genre.upsert({
    where: { name: "History" },
    update: {},
    create: {
      name: "History",
      description: "Historical events and civilizations.",
    },
  });

  // 2. Create 16 books distributed across four genres
  const books = [
    // Fiction books
    {
      title: "Things Fall Apart",
      author: "Chinua Achebe",
      isbn: "9780385474542",
      publishedYear: 1958,
      availableCopies: 5,
      genreId: fiction.id,
    },
    {
      title: "The River Between",
      author: "Ngugi wa Thiong'o",
      isbn: "9780435905484",
      publishedYear: 1965,
      availableCopies: 4,
      genreId: fiction.id,
    },
    {
      title: "Animal Farm",
      author: "George Orwell",
      isbn: "9780451526342",
      publishedYear: 1945,
      availableCopies: 3,
      genreId: fiction.id,
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "9780743273565",
      publishedYear: 1925,
      availableCopies: 2,
      genreId: fiction.id,
    },

    // Science books
    {
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      isbn: "9780553380163",
      publishedYear: 1988,
      availableCopies: 4,
      genreId: science.id,
    },
    {
      title: "The Selfish Gene",
      author: "Richard Dawkins",
      isbn: "9780198788607",
      publishedYear: 1976,
      availableCopies: 3,
      genreId: science.id,
    },
    {
      title: "Cosmos",
      author: "Carl Sagan",
      isbn: "9780345539434",
      publishedYear: 1980,
      availableCopies: 5,
      genreId: science.id,
    },
    {
      title: "The Origin of Species",
      author: "Charles Darwin",
      isbn: "9781509827695",
      publishedYear: 1859,
      availableCopies: 2,
      genreId: science.id,
    },

    // Technology books
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "9780132350884",
      publishedYear: 2008,
      availableCopies: 5,
      genreId: technology.id,
    },
    {
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt and David Thomas",
      isbn: "9780135957059",
      publishedYear: 1999,
      availableCopies: 3,
      genreId: technology.id,
    },
    {
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      isbn: "9780262046305",
      publishedYear: 2022,
      availableCopies: 2,
      genreId: technology.id,
    },
    {
      title: "Computer Networking",
      author: "Andrew S. Tanenbaum",
      isbn: "9780132126953",
      publishedYear: 2010,
      availableCopies: 4,
      genreId: technology.id,
    },

    // History books
    {
      title: "The Art of War",
      author: "Sun Tzu",
      isbn: "9781590302255",
      publishedYear: -500,
      availableCopies: 3,
      genreId: history.id,
    },
    {
      title: "Guns, Germs, and Steel",
      author: "Jared Diamond",
      isbn: "9780393354324",
      publishedYear: 1997,
      availableCopies: 4,
      genreId: history.id,
    },
    {
      title: "The History of Kenya",
      author: "W. R. Ochieng",
      isbn: "9780435923533",
      publishedYear: 1985,
      availableCopies: 3,
      genreId: history.id,
    },
    {
      title: "The Diary of a Young Girl",
      author: "Anne Frank",
      isbn: "9780553296983",
      publishedYear: 1947,
      availableCopies: 2,
      genreId: history.id,
    },
  ];

  await prisma.book.createMany({
    data: books,
    skipDuplicates: true,
  });

  console.log("Seeding completed successfully!");
  console.log("4 genres created or verified.");
  console.log("16 books inserted or already present.");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });