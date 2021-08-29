import { useRouter } from "next/dist/client/router";
import { RouteComponentProps } from "react-router";
import { useNotes } from "../../../customHooks";
import AddNote from "../../../molecules/addNote";
import { Note } from "../../../molecules/types";
import { CALL_API } from "../../../utils";
import styles from "../../../styles/Note.module.css";

interface EditNoteProps extends RouteComponentProps {
  note: Note;
}

export function EditNote(props: EditNoteProps) {
  const { editNote } = useNotes({});
  const router = useRouter();
  return (
    <div className={styles.addNote}>
      <AddNote
        initTitle={props?.note?.title}
        initDescription={props?.note?.description}
        initEditMode ={true}
        id={props?.note?.id}
        editNote={editNote}
        onClose={() => router.push("/")}
      />
    </div>
  );
}

export const getStaticPaths = async (context: any) => {
  const data: Note[] = await CALL_API({ url: "/notes" });
  const paths = data.map((note) => ({ params: { id: `${note.id}` } }));
  return { paths, fallback: false };
};

export async function getStaticProps({ params }: any) {
  const note: Note = await CALL_API({ url: `/notes/${params.id}` });
  return { props: { note } };
}

export default EditNote;
