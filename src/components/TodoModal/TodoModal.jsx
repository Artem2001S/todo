import React, { useEffect, useState } from 'react';
import s from './TodoModal.module.scss';
import TextareaAutosize from 'react-textarea-autosize';

import Modal from 'react-modal';
import Button from 'components/UI/Button/Button';

const customStyles = {
  overlay: {
    zIndex: 9999999999999
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    maxHeight: '88%',
    borderRadius: '15px',
    width: '65%',
    marginRight: '-50%',
    zIndex: 9999999999999,
    transform: 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#yourAppElement');

const TodoModal = function({ isOpen, close, onSave, todo }) {
  const [value, setValue] = useState(todo?.comment);

  useEffect(() => {
    if (isOpen) {
      document.body.style = 'overflow: hidden';
    } else {
      document.body.style = 'overflow: initial';
    }
  }, [isOpen]);

  useEffect(() => {
    setValue(todo?.comment);
  }, [todo]);
  const save = () => {
    onSave({ ...todo, comment: value });
    close();
  };
  return (
    <Modal
      onRequestClose={close}
      isOpen={isOpen}
      //   onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {todo && (
        <div className={s.form}>
          <span className={s.label}>Комментарий:</span>
          <TextareaAutosize
            className={s.textarea}
            autoFocus
            onChange={e => {
              setValue(e.target.value);
            }}
            value={value}
          />
          <Button isActive className={s.btn} onClick={save}>
            Сохранить
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default TodoModal;
