import { db } from "../../prisma/db";
import { parseMarkdownFile } from "../../services/parser/markdown.service";
import type { NoteType } from "../../types/types/notes";

export const uploadNoteService = async (
  file: Express.Multer.File,
  body: NoteType,
) => {
  const note = parseMarkdownFile(file.buffer);

  const created = await db.orm.public.Note.create({
    title: body.title,
    description: body.desc,
    content: note,
  });

  return created;
};

export const createNoteService = async (
  title: string,
  desc: string,
  content: string,
) => {
  const created = await db.orm.public.Note.create({
    title,
    description: desc,
    content,
  });

  return created;
};
