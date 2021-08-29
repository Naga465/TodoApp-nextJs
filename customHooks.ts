import { createContext, useCallback, useEffect, useState } from "react";
import { Note, NoteInfo } from "./molecules/types";
import { CALL_API } from "./utils";

type NotesContextType = {
  notes: Note[];
  addNote: (data: NoteInfo) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  editNote: (body: NoteInfo, id: number) => Promise<void>;
};

export function useNotes({
  initNotes = [],
  initRefresh = false,
}: {
  initNotes?: Note[];
  initRefresh?: boolean;
}): NotesContextType {
  const [notes, setNotes] = useState<Note[]>(initNotes);
  const [refresh, setRefresh] = useState<boolean>(initRefresh);

  useEffect(() => {
    async function getNotes(): Promise<void> {
      const notes: Note[] = await CALL_API({ url: "/notes" });
      setNotes(notes);
      setRefresh(false);
    }
    if (refresh) {
      getNotes();
    }
  }, [refresh]);

  const editNote = useCallback(
    async (body: NoteInfo, id: number): Promise<void> => {
      try {
        await CALL_API({
          url: `/notes/${id}`,
          body,
          method: "PUT",
        });
      } catch (err) {
        throw err;
      }
    },
    []
  );

  const addNote = useCallback(async (body: NoteInfo): Promise<void> => {
    try {
      await CALL_API({
        url: `/notes`,
        body,
        method: "POST",
      });
      setRefresh(true);
    } catch (err) {
      throw err;
    }
  }, []);

  const deleteNote = useCallback(async (id: number): Promise<void> => {
    try {
      await CALL_API({
        url: `/notes/${id}`,
        method: "DELETE",
      });
      setRefresh(true);
    } catch (err) {
      throw err;
    }
  }, []);
  return {
    notes,
    deleteNote,
    addNote,
    editNote,
  };
}
