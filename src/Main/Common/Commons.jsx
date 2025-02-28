import errorFile from "../../Assets/erro.mp3";
import warningFile from "../../Assets/warning.mp3";
import notificationsound from "../../Assets/notification.mp3";
import dayjs from "dayjs";
export const playErrorSound = () => {
  const audio = new Audio(errorFile);
  audio.play().catch((error) => {
    console.log("Audio play failed:", error);
  });
};
export const playSuccessSound = () => {
  const audio = new Audio(notificationsound);
  audio.play().catch((error) => {
    console.log("Audio play failed:", error);
  });
};
export const playWarningSound = () => {
  const audio = new Audio(warningFile);
  audio.play().catch((error) => {
    console.log("Audio play failed:", error);
  });
};

export function getHighestPriorityRole(roles) {
  if (roles?.length > 0) {
    if (roles?.includes("ADMIN")) {
      return "ADMIN";
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
];

export function modifyObject(obj) {
  const modifiedObject = {};
  for (let key in obj) {
    modifiedObject[key] = {
      selectedKeys: [],
      value: [...obj[key]],
    };
  }
  return modifiedObject;
}

export function updateKeysAtIndex(obj, index, newKeys) {
  let temp = { ...obj };
  if (index) {
    temp[index].selectedKeys = newKeys;
    return temp;
  } else {
    console.error("Invalid index");
  }
  return obj;
}

export function maskEmail(email) {
  if (email) {
    const [localPart, domain] = email?.split("@"); // Split the email into local and domain parts
    const localMasked =
      localPart?.substring(0, 2) + "***" + localPart?.substring(6);
    const domainMasked = domain?.substring(0, 2) + "***" + domain?.substring(5);
    return `${localMasked}@${domainMasked}`;
  }
}

export function maskMobileNumber(mobile) {
  if (mobile) {
    const start = mobile.substring(0, 3);
    const stars = "****";
    const end = mobile.substring(mobile.length - 3);
    return `${start}${stars}${end}`;
  }
}

export const paymentTermDays = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45,
];
