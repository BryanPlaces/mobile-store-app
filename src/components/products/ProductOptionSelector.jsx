import { useState } from "react";

const ProductOptionSelector  = ({ options, selectedOption, onSelect, title, optionType }) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-3">
      <button
        className={`w-100 p-3 text-start border rounded d-flex justify-content-between align-items-center ${ isOpen ? "border-dark" : "border-light" }`}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        style={{ background: "none", cursor: "pointer" }}
      >
        <span>
          {
            selectedOption ? `${title}: ${options.find((opt) => opt.code === selectedOption)?.name}` : `Select a ${title.toLowerCase()}`
          }
        </span>
        <span>{ isOpen ? "-" : "+" }</span>
      </button>

      {/* Collapse options */}
      <div className={`collapse ${isOpen ? "show" : ""}`}>
        <div className="mt-2 border rounded p-3">
          {
            options.map((option) => (
              <div
                key={option.code}
                className={`p-2 mb-2 rounded ${selectedOption === option.code ? "bg-light border border-dark" : "border"}`}
                onClick={() => onSelect(option.code)}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-center">
                  <input
                    id={`${optionType}-${option.code}`}
                    type="radio"
                    name={`${optionType}Options`}
                    value={option.code}
                    checked={selectedOption === option.code}
                    onChange={() => onSelect(option.code)}
                    className="me-2"
                  />
                  <label htmlFor={`${optionType}-${option.code}`} className="mb-0">
                    { option.name }
                  </label>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ProductOptionSelector;