import React, { useState, useEffect } from "react";

function TextAnimation() {
  const [firmName, setFirmName] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (firmName.trim() === "") {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `https://signpostphonebook.in/client_fetch_byname_and_byperson.php?searchname=${firmName}`
        );

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          const sortedData = data
            .filter(
              (item) =>
                item.businessname
                  .toLowerCase()
                  .includes(firmName.toLowerCase()) ||
                item.personname.toLowerCase().includes(firmName.toLowerCase())
            )
            .sort((a, b) => {
              const nameA =
                a.businessname.toLowerCase() || a.personname.toLowerCase();
              const nameB =
                b.businessname.toLowerCase() || b.personname.toLowerCase();
              return nameA.localeCompare(nameB);
            });

          setSuggestions(sortedData);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [firmName]);

  return (
    <div className="p-4">
      <label htmlFor="firmName" className="block mb-2 font-semibold">
        Firm Name
      </label>
      <input
        type="text"
        id="firmName"
        value={firmName}
        onChange={(e) => setFirmName(e.target.value)}
        className="border p-2 w-full rounded"
        placeholder="Type a firm or business name"
      />
      {suggestions.length > 0 && (
        <ul className="mt-2 border rounded shadow-lg bg-white max-h-48 overflow-y-auto">
          {suggestions.map((item, index) => (
            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
              {item.businessname || item.personname}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TextAnimation;
