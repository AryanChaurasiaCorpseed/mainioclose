import errorFile from "../../Assets/erro.mp3"
import warningFile from "../../Assets/warning.mp3"
import notificationsound from "../../Assets/notification.mp3"
import dayjs from "dayjs"
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

export function getHighestPriorityRole(roles) {
  if (roles?.length > 0) {
    if (roles?.includes("ADMIN")) {
      return "ADMIN"
    }
  }
}

export const rangePresets = [
  {
    label: "Last 7 Days",
    value: [dayjs().add(-7, "d"), dayjs()],
  },
  {
    label: "Last 14 Days",
    value: [dayjs().add(-14, "d"), dayjs()],
  },
  {
    label: "Last 30 Days",
    value: [dayjs().add(-30, "d"), dayjs()],
  },
  {
    label: "Last 90 Days",
    value: [dayjs().add(-90, "d"), dayjs()],
  },
]
