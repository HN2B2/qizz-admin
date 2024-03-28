import ky from "ky";
import { Exception } from "@/types/exception";

export const instance = ky.create({
  prefixUrl: process.env.API_URL || "http://localhost:6868/v1",
  credentials: "include",
  hooks: {
    beforeError: [
      async (error) => {
        const { response } = error;

        if (response) {
          const data: Exception = await response.json();
          error.name = `(${data.status}) ${data.error}`;
          error.message = data.message;
        }

        return error;
      },
    ],
  },
});

export const getErrorStatusCode = (error: any) => {
  if (error) {
    return parseInt(error.name.split(" ")[0].replace("(", ""));
  } else {
    return 200;
  }
};

// export const localInstance = ky.create({
//     prefixUrl: appUrl,
//     credentials: "include",
// })

export const getServerErrorNoti = (error: any) => {
  if (error) {
    return error.message;
  } else {
    return "Something went wrong";
  }
};

export const convertDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString("vi-VI", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const removeEmpty = (obj: any) => {
  let newObj: any = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] === Object(obj[key])) newObj[key] = removeEmpty(obj[key]);
    else if (obj[key] !== undefined) newObj[key] = obj[key];
  });
  return newObj;
};
