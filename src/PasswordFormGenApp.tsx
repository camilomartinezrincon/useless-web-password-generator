import { useState } from "react";
import "./styles/form.css";
import { Copy } from "lucide-react";

export function PasswordFormGenApp() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [selected, setSelected] = useState("");
  const [options, setOptions] = useState({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleOption = (key: keyof typeof options) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let charset = "";
    if (options.uppercase) charset += uppercase;
    if (options.lowercase) charset += lowercase;
    if (options.numbers) charset += numbers;
    if (options.symbols) charset += symbols;

    // Si no hay ninguna opción seleccionada, usa todas
    if (charset === "") charset = uppercase + lowercase + numbers + symbols;

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setGeneratedPassword(password);
  };

  return (
    <div className="credentials-form">
      <h3>Credentials Generator</h3>
      <form onSubmit={handleGenerate}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" placeholder="Enter username" />
        </div>

        <div className="form-group">
          <label className="section-label">Password Options</label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={options.uppercase}
                onChange={() => toggleOption("uppercase")}
              />
              <span>Uppercase Letters (A-Z)</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={options.lowercase}
                onChange={() => toggleOption("lowercase")}
              />
              <span>Lowercase Letters (a-z)</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={options.numbers}
                onChange={() => toggleOption("numbers")}
              />
              <span>Numbers (0-9)</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={options.symbols}
                onChange={() => toggleOption("symbols")}
              />
              <span>Symbols (!@#$%...)</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="section-label">
            Password Length:
            <span className="length-value">{passwordLength}</span>
          </label>
          <input
            type="range"
            min={8}
            max={32}
            value={passwordLength}
            onChange={(e) => setPasswordLength(Number(e.target.value))}
            className="range-slider"
          />
          <div className="range-labels">
            <span>8</span>
            <span>32</span>
          </div>
        </div>

        <button type="submit" className="generate-btn">
          Generate Password
        </button>

        <div className="form-group generated-group">
          <label className="section-label">Generated Password</label>
          <div className="input-copy">
            <input type="text" readOnly value={generatedPassword} />
            <button type="button" onClick={handleCopy} className="copy-btn">
              <Copy size={16} />
            </button>
          </div>
          {copied && <span className="copied-msg">Password copied!</span>}
        </div>
        <div className="form-group">
          <label className="section-label">Download Format</label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="radio"
                name="size"
                value="csv"
                checked={selected === "csv"}
                onChange={(e) => setSelected(e.target.value)}
              />
              <span>CSV</span>
            </label>
            <label className="checkbox-label">
              <input
                type="radio"
                name="size"
                value="txt"
                checked={selected === "txt"}
                onChange={(e) => setSelected(e.target.value)}
              />
              <span>TXT</span>
            </label>
          </div>
        </div>
        <button type="submit" className="generate-btn">
          Download
        </button>
      </form>
    </div>
  );
}
