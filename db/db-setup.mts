import db from "./db.mjs";
import { readdirSync } from "fs";
import path from "path";

function readPdfPath(relative_uploads_path: string): string[] {
  const uploadsDir = path.join(process.cwd(), relative_uploads_path)
  const files = readdirSync(uploadsDir);
  return files.map((file) => path.join(uploadsDir, file));
}


export default async function dbSetup(): Promise<void> {
  const pdf_path = readPdfPath("./uploads")
  for (const file of pdf_path) {
    await db.pdfFile.create({
      data: {
        fileName: file.split("/").pop()!,
        filePath: file,
      },
    });
    console.log(`File ${file.split("/").pop()} added to database`);
  }
}

dbSetup()

