import errorFile from "../../Assets/erro.mp3"
import warningFile from "../../Assets/warning.mp3"
import notificationsound from "../../Assets/notification.mp3"
export const playErrorSound = () => {
  const audio = new Audio(errorFile)
  audio.play().catch((error) => {
    console.log("Audio play failed:", error)
  })
}
export const playSuccessSound = () => {
  const audio = new Audio(notificationsound)
  audio.play().catch((error) => {
    console.log("Audio play failed:", error)
  })
}
export const playWarningSound = () => {
  const audio = new Audio(warningFile)
  audio.play().catch((error) => {
    console.log("Audio play failed:", error)
  })
}
