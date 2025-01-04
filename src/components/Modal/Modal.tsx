import * as style from './Modal.css';

interface ModalProps {
  winner: string;
  onRestart: () => void;
}

const Modal = ({ winner, onRestart }: ModalProps) => {
  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <h2>Victory!</h2>
        <p>
          <span role="img" aria-label="trophy">
            🏆
          </span>{' '}
          Winner:
          <strong> {winner} </strong> Team!{' '}
          <span role="img" aria-label="fire">
            🔥
          </span>
        </p>
        <button onClick={onRestart} className={style.restartButton}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default Modal;
