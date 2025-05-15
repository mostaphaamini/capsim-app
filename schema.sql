-- Create Questions table
CREATE TABLE "question" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "text" VARCHAR NOT NULL,
  "type" VARCHAR NOT NULL
);

-- Create Answers table
CREATE TABLE "answer" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "text" VARCHAR NOT NULL,
  "points" INTEGER NOT NULL,
  "questionId" INTEGER,
  FOREIGN KEY ("questionId") REFERENCES "question" ("id") ON DELETE CASCADE
);

-- Create Submissions table
CREATE TABLE "submission" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "score" INTEGER NOT NULL,
  "totalPoints" INTEGER NOT NULL,
  "maxPoints" INTEGER NOT NULL,
  "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);
