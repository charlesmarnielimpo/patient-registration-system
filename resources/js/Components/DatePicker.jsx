import { useState, useEffect } from "react";
import {
    format,
    getMonth,
    getYear,
    setMonth,
    setYear,
    parseISO,
} from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

export function DatePicker({
    id,
    name,
    value,
    onChange,
    startYear = getYear(new Date()) - 100,
    endYear = getYear(new Date()),
}) {
    const [date, setDate] = useState(value ? parseISO(value) : new Date());
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const years = Array.from(
        { length: endYear - startYear + 1 },
        (_, i) => startYear + i
    );

    const handleMonthChange = (month) => {
        const newDate = setMonth(date, months.indexOf(month));
        setDate(newDate);
        onChange(name, format(newDate, "yyyy-MM-dd"));
    };

    const handleYearChange = (year) => {
        const newDate = setYear(date, parseInt(year));
        setDate(newDate);
        onChange(name, format(newDate, "yyyy-MM-dd"));
    };

    const handleSelect = (selectedDate) => {
        if (selectedDate) {
            setDate(selectedDate);
            onChange(name, format(selectedDate, "yyyy-MM-dd"));
        }
    };

    useEffect(() => {
        if (value) {
            setDate(parseISO(value));
        }
    }, [value]);

    return (
        <Popover>
            <PopoverTrigger id={id} asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {date ? (
                        format(date, "MMMM dd, yyyy")
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <div className="flex items-center space-x-2 p-2">
                    <Select
                        onValueChange={handleMonthChange}
                        value={months[getMonth(date)]}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map((month) => (
                                <SelectItem key={month} value={month}>
                                    {month}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        onValueChange={handleYearChange}
                        value={getYear(date)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((year) => (
                                <SelectItem key={year} value={year}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleSelect}
                    initialFocus
                    month={date}
                    onMonthChange={setDate}
                />
            </PopoverContent>
        </Popover>
    );
}
