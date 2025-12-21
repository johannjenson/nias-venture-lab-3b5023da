import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countryCodes } from "@/data/countries";

interface PhoneInputWithCodeProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const PhoneInputWithCode = ({
  value,
  onChange,
  placeholder = "Phone Number",
}: PhoneInputWithCodeProps) => {
  // Store the selected country index to handle countries with the same code
  const [selectedIndex, setSelectedIndex] = useState(0); // Default to Saudi Arabia (first item)
  // Store the phone number separately to avoid regex issues
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const selectedCountry = countryCodes[selectedIndex];
  const countryCode = selectedCountry?.code || "+966";

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/[^\d]/g, "");
    setPhoneNumber(digits);
    onChange(`${countryCode}${digits}`);
  };

  const handleCountryChange = (indexStr: string) => {
    const index = parseInt(indexStr, 10);
    setSelectedIndex(index);
    const newCode = countryCodes[index]?.code || "+966";
    onChange(`${newCode}${phoneNumber}`);
  };

  return (
    <div className="flex gap-2">
      <Select value={String(selectedIndex)} onValueChange={handleCountryChange}>
        <SelectTrigger className="w-[140px] flex-shrink-0">
          <SelectValue>
            <span className="flex items-center gap-2">
              <span>{selectedCountry?.flag}</span>
              <span className="text-xs text-muted-foreground">{countryCode}</span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {countryCodes.map((country, index) => (
            <SelectItem key={index} value={String(index)}>
              <span className="flex items-center gap-2">
                <span>{country.flag}</span>
                <span className="text-xs text-muted-foreground">{country.code}</span>
                <span className="text-xs">{country.country}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="tel"
        placeholder={placeholder}
        value={phoneNumber}
        onChange={handlePhoneChange}
        className="flex-1"
      />
    </div>
  );
};

export default PhoneInputWithCode;
