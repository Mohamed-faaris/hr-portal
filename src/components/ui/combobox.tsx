"use client";

import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

interface ComboboxProps {
  options: string[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}

export function Combobox({
  options: defaultOptions,
  value,
  onChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyText = "No matches found.",
  className,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const [filteredOptions, setFilteredOptions] = useState(defaultOptions);

  const handleChange = useCallback(
    (newInputValue: string) => {
      if (newInputValue === "") {
        setFilteredOptions(defaultOptions);
      } else {
        const regex = new RegExp(
          newInputValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          "gi"
        );
        setFilteredOptions(
          defaultOptions.filter((option) => option.match(regex))
        );
      }
    },
    [defaultOptions]
  );

  const debouncedHandleChange = useMemo(
    () => debounce(handleChange, 300),
    [handleChange]
  );

  useEffect(() => {
    return () => {
      debouncedHandleChange.cancel();
    };
  }, [debouncedHandleChange]);

  useEffect(() => {
    setInputValue(value || "");
    setFilteredOptions(defaultOptions);
  }, [value, defaultOptions]);

  const handleInputChange = (newInputValue: string) => {
    setInputValue(newInputValue);
    debouncedHandleChange(newInputValue);
  };

  const handleSelect = (selectedValue: string) => {
    setInputValue(selectedValue);
    onChange(selectedValue);
    setFilteredOptions(defaultOptions);
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setInputValue(value || "");
      setFilteredOptions(defaultOptions);
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          <span className={cn("truncate", !value && "text-muted-foreground")}>
            {value || placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            value={inputValue}
            onValueChange={handleInputChange}
          />
          <CommandList>
            {filteredOptions.length === 0 ? (
              <CommandEmpty>
                {inputValue ? (
                  <button
                    className="w-full text-left text-sm hover:bg-accent"
                    onClick={() => handleSelect(inputValue)}
                  >
                    Use "<strong>{inputValue}</strong>" as custom value
                  </button>
                ) : (
                  emptyText
                )}
              </CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => handleSelect(option)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
