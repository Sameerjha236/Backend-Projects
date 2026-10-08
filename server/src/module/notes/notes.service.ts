import { db } from "../../prisma/db";
import { parseMarkdownFile } from "../../services/parser/markdown.service";
import { markdownToHtml } from "../../services/parser/markdownToHtml.service";
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

export const getNotesService = async () => {
  const notes = await db.orm.public.Note.select(
    "id",
    "title",
    "description",
    "createdAt",
  ).all();
  return notes;
};

export const getNoteByIdService = async (id: string) => {
  const note = await db.orm.public.Note.select(
    "id",
    "title",
    "description",
    "content",
    "createdAt",
    "updatedAt",
  )
    .where({ id })
    .first();

  if (note?.content) {
    note.content = await markdownToHtml(note?.content || "");
  }
  return note;
};
