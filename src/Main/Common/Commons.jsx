import errorFile from '../../Assets/erro.mp3'
import successFile from '../../Assets/success.mp3'
import warningFile from '../../Assets/warning.mp3'
export const playErrorSound = () => {
    const audio = new Audio(errorFile);
    // audio.play();
  };
export const playSuccessSound = () => {
    const audio = new Audio(successFile);
    // audio.play();
  };
export const playWarningSound = () => {
    const audio = new Audio(warningFile);
    // audio.play();
  };