import { ReactNode } from "react";

interface TextAreaProps {
  id?: string,
  name?: string,
  placeholder?: string,
  required?: boolean,
  children?: ReactNode,
}


export default function TextArea({ id, name, placeholder, required, children}: TextAreaProps) {
  return(
    <textarea 
      className="
        border border-neutral-200 rounded
      "
      name={name} 
      id={id} 
      placeholder={placeholder} 
      required={required}
    >
      {children}
    </textarea>
  );
}