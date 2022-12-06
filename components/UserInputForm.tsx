import { useContext, useEffect, useState } from "react";
import { UserInputContext } from "./UserOperationManager";
import { useAccount } from "wagmi";

export default function UserInputForm() {
  const { isConnected } = useAccount();
  const [isHydrated, setIsHydrated] = useState(false);
  const { UserInput, setUserInput } = useContext(UserInputContext);

  const parseUserInput = (e) => {
    const value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1")
      .replace(/^0[^.]/, "0");
    setUserInput(value);
  };
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <input
      className="bg-transparent appearance-none border-none focus:ring-none focus:border-none after:border-none text-left text-2xl flex font-proxima w-full h-10 focus:outline-none text-white p-2"
      inputMode="decimal"
      pattern="^[0-9]*[.,]?[0-9]*$"
      value={UserInput}
      placeholder="0.0"
      required={true}
      onChange={(e) => {
        parseUserInput(e);
      }}
      minLength={1}
      maxLength={79}
      spellCheck="false"
      autoFocus={true}
      disabled={isHydrated && !isConnected}
    />
  );
}




