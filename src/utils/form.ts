import { Dispatch, SetStateAction } from "react";

export const handleTextChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setFormData: Dispatch<SetStateAction<any>>,
  formData: any
) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
