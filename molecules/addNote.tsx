import { useState } from "react";
import { AddNoteProps, NoteInfo } from "./types";
import styles from "../styles/Note.module.css";
import { useRouter } from "next/dist/client/router";
import { useCallback } from "react";

function AddNote({
  initTitle = "",
  initDescription = "",
  onSave = async () => {},
  editNote = async () => {},
  onClose,
  id = null,
  initEditMode = false,
}: AddNoteProps) {
  const [title, setTitle] = useState<string>(initTitle);
  const [description, setDescription] = useState<string>(initDescription);
  const [editMode, setEditMode] = useState<boolean>(initEditMode);
  const router = useRouter();
  const _onSave = async () => {
    const body: NoteInfo = {
      title,
      description,
      timeStamp: new Date(),
    };
    try {
      id ? await editNote(body, id) : await onSave(body);
      if (!!id) {
        router.push("/");
      } else {
        resetState();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const _onClose = () => {
    resetState()
    if (!!onClose && typeof onClose === "function") {
      onClose();
    }
  };

  const resetState = useCallback(() => {
    setTitle(initTitle);
    setDescription(initDescription);
    setEditMode(initEditMode);
  }, [initEditMode, initDescription, initTitle]);

  return editMode ? (
    <div className={styles.card}>
      <input
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        id="title"
        name="title"
        value={title}
        placeholder="Title"
        className={styles.noteTitle}
      />
      <textarea
        cols={5}
        rows={5}
        onChange={(e) => setDescription(e.target.value)}
        id="Description"
        name="desc"
        value={description}
        placeholder="Take a note..."
        className={styles.desc}
        autoFocus
      />
      <div className={styles.btnGroup}>
        <button
          disabled={!(title || description)}
          className={styles.successBtn}
          onClick={_onSave}
        >
          {id ? "Update" : "Create"}
        </button>
        <button onClick={_onClose}>Cancel</button>
      </div>
    </div>
  ) : (
    <div
      onClick={() => setEditMode(true)}
      className={styles.card + " " + styles.add}
    >
      <p className={styles.takeNote}>Take a Note...</p>
    </div>
  );
}
export default AddNote;
