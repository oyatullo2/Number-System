import { useEffect, useState } from "react";

function App() {
  const [placeholder, setPlaceholder] = useState(
    "Enter the current number system"
  );
  const [currentSystem, setCurrentSystem] = useState("");
  const [targetSystem, setTargetSystem] = useState("");
  const [result, setResult] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    switch (currentSystem) {
      case "binary":
        setPlaceholder("Enter Binary Number");
        break;
      case "decimal":
        setPlaceholder("Enter Decimal Number");
        break;
      case "hex":
        setPlaceholder("Enter Hex Number");
        break;
      case "octal":
        setPlaceholder("Enter Octal Number");
        break;
      default:
        setPlaceholder("Enter the current number system");
    }
  }, [currentSystem]);

  // Input validation
  const validateInput = (value) => {
    let regex;
    switch (currentSystem) {
      case "binary":
        regex = /^[01]*$/;
        break;
      case "decimal":
        regex = /^[0-9]*$/;
        break;
      case "hex":
        regex = /^[0-9A-Fa-f]*$/;
        break;
      case "octal":
        regex = /^[0-7]*$/;
        break;
      default:
        return false;
    }
    return regex.test(value);
  };

  // Handle input change with validation
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (validateInput(value)) {
      setInputValue(value);
    }
  };

  // Convert number system
  const convertNumber = () => {
    let decimalValue;

    if (!inputValue) return;

    switch (currentSystem) {
      case "binary":
        decimalValue = parseInt(inputValue, 2);
        break;
      case "octal":
        decimalValue = parseInt(inputValue, 8);
        break;
      case "decimal":
        decimalValue = parseInt(inputValue, 10);
        break;
      case "hex":
        decimalValue = parseInt(inputValue, 16);
        break;
      default:
        return;
    }

    let convertedValue;
    switch (targetSystem) {
      case "binary":
        convertedValue = decimalValue.toString(2);
        break;
      case "octal":
        convertedValue = decimalValue.toString(8);
        break;
      case "decimal":
        convertedValue = decimalValue.toString(10);
        break;
      case "hex":
        convertedValue = decimalValue.toString(16).toUpperCase();
        break;
      default:
        return;
    }

    setResult(convertedValue);
  };

  return (
    <div className="w-full px-2 transition-all ease-in-out duration-500 bg-black/95 h-screen flex justify-center items-center">
      <div className="w-full relative px-2 max-w-[550px] gap-5 h-screen max-h-[300px] rounded-md bg-black/25 shadow-white shadow-sm flex flex-col justify-center items-center">
        <input
          type="text"
          maxLength={15}
          value={inputValue}
          onChange={handleInputChange}
          className="rounded-md font-[700] outline-none w-full max-w-[450px] py-[7px] px-[10px]"
          placeholder={placeholder}
        />

        {/* Current Number System Selection */}
        <select
          className="rounded-md font-[700] outline-none w-full max-w-[450px] py-[7px] px-[10px]"
          value={currentSystem}
          onChange={(e) => setCurrentSystem(e.target.value)}
        >
          <option value="" disabled>
            Enter the current number system
          </option>
          <option value="binary">Binary</option>
          <option value="decimal">Decimal</option>
          <option value="hex">Hexadecimal</option>
          <option value="octal">Octal</option>
        </select>

        {/* Target Number System Selection */}
        <select
          className="rounded-md font-[700] outline-none w-full max-w-[450px] py-[7px] px-[10px]"
          value={targetSystem}
          onChange={(e) => setTargetSystem(e.target.value)}
        >
          <option value="" disabled>
            Select the number system you want to convert to
          </option>
          <option value="binary">Binary</option>
          <option value="decimal">Decimal</option>
          <option value="hex">Hexadecimal</option>
          <option value="octal">Octal</option>
        </select>

        <button
          onClick={convertNumber}
          className="w-full max-w-[450px] border-white border-[2px] text-white py-[4px] hover:bg-white transition-all duration-500 ease-in-out hover:border-transparent hover:text-black font-[700] text-[18px] rounded-md"
        >
          Convert
        </button>

        <p className="text-green-400 font-[700] text-[18px] absolute bottom-3">
          {result}
        </p>
      </div>
    </div>
  );
}

export default App;
