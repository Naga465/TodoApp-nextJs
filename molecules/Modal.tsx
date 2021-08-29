import { useCallback } from "react";
import { useState } from "react";
import styles from '../styles/Note.module.css'

function Modal(props: any) {
  if(!props.show) {  return null }
  return (
    <div onClick ={props.onClose} className={styles.modalContainer}>
    <div className={styles.modal} id="modal">
      <h2>Modal Window</h2>
      <div className={styles.content}>{props.children}</div>
      <div className={styles.actions}>
        <button className="toggle-button" onClick={props.onClose}>
          close
        </button>
      </div>
    </div>
    </div>
  );
}

export function useModal({ initShow  = false }) {
    const [show, setModal] =  useState<boolean>(initShow);
    const closeModal =  useCallback(() => { 
        setModal(initShow)
    },[initShow])

    const openModal = useCallback(() => { 
        setModal(true);
    },[])

    return { 
        show,
        openModal,
        closeModal
    }
}

export default Modal;
