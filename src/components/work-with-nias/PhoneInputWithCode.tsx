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
  const [countryCode, setCountryCode] = useState("+966");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value.replace(/[^\d]/g, "");
    onChange(`${countryCode}${phoneNumber}`);
  };

  const handleCountryChange = (code: string) => {
    setCountryCode(code);
    const phoneOnly = value.replace(/^\+\d+/, "");
    onChange(`${code}${phoneOnly}`);
  };

  // Extract phone number without country code for display
  const displayPhone = value.replace(/^\+\d+/, "");

  return (
    <div className="flex gap-2">
      <Select value={countryCode} onValueChange={handleCountryChange}>
        <SelectTrigger className="w-[140px] flex-shrink-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {countryCodes.map((country, index) => (
            <SelectItem key={`${country.code}-${country.country}-${index}`} value={country.code}>
              <span className="flex items-center gap-2">
                <span>{country.flag}</span>
                <span className="text-xs text-muted-foreground">{country.code}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="tel"
        placeholder={placeholder}
        value={displayPhone}
        onChange={handlePhoneChange}
        className="flex-1"
      />
    </div>
  );
};

export default PhoneInputWithCode;
