import React, { useState, useEffect, useRef } from "react";
import type {
  ChangeEvent,
  KeyboardEvent,
  FormEventHandler,
  FormEvent,
} from "react";
import Button from "./AuthFormComponents/Button";
import Header from "./AuthFormComponents/Header";
import { toast } from "sonner";

const VerifyEmail: React.FC = () => {
  const [arrayValue, setArrayValue] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ] as string[]);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const onPaste = async () => {
    if (!navigator) {
      toast.warning("Your browser does not support clipboard paste");
      return;
    }
    if (!navigator.clipboard) {
      toast.warning("Your browser does not support clipboard paste");
      return;
    }
    try {
      const pasteData = await navigator.clipboard.readText();

      const pasteArray: string[] = pasteData
        .split("")
        .filter((char) => !isNaN(parseInt(char)));
      const paddedPasteArray: string[] = Array.from(
        { length: arrayValue.length },
        (_, i) => pasteArray[i] ?? "",
      );

      setArrayValue(paddedPasteArray);
    } catch (error) {
      console.error("Failed to read text from clipboard:", error);
    }
  };

  const onKeyDown = async (
    e: KeyboardEvent<HTMLInputElement>,
  ): Promise<void> => {
    const keyCode = parseInt(e.key);
    if (
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !(e.metaKey && e.key === "v") &&
      !(keyCode >= 0 && keyCode <= 9)
    ) {
      e.preventDefault();
    }
    if (e.ctrlKey && e.key === "v") {
      await onPaste();
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
    const input = e.target.value;

    if (!isNaN(parseInt(input))) {
      setArrayValue((preValue) => {
        const newArray = [...preValue];
        newArray[index] = input;
        return newArray;
      });

      if (input !== "" && index < arrayValue.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>, index: number): void => {
    if (e.key === "Backspace" || e.key === "Delete") {
      setArrayValue((prevValue) => {
        const newArray = [...prevValue];
        newArray[index] = "";
        return newArray;
      });

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    e: FormEvent<HTMLFormElement>,
  ): void => {
    e.preventDefault();
    if (arrayValue.toString().replaceAll(",", "").length !== 8) {
      toast.warning("Please enter a valid code");
      return;
    }
    setArrayValue(Array.from({ length: arrayValue.length }, (_) => ""));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-border-pad-layout items-center"
    >
      <Header />
      <div className="flex flex-col gap-2">
        <label>Code:</label>
        <div className="flex gap-2 self-center">
          {arrayValue.map((value, index) => (
            <input
              key={`index-${index}`}
              ref={(el) => el && (inputRefs.current[index] = el)}
              inputMode="numeric"
              maxLength={1}
              name="passcode"
              type="text"
              value={String(value)}
              onChange={(e) => onChange(e, index)}
              onKeyUp={(e) => onKeyUp(e, index)}
              onKeyDown={(e) => onKeyDown(e)}
              className="h-12 w-12 rounded-md border text-center placeholder:text-opacity-45 focus:border focus:border-black focus:outline-none"
              autoComplete="off"
              accessKey={String(index)}
            />
          ))}
        </div>
      </div>
      <Button />
    </form>
  );
};

export default VerifyEmail;
