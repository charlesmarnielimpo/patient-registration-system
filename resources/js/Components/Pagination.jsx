import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

const Pagination = ({ table, totalRows }) => {
    const { pageIndex, pageSize } = table.getState().pagination;
    const filteredRows = table.getFilteredRowModel().rows;
    const filteredTotalRows = filteredRows.length;

    // If no results are found, show 0 to 0 of 0 entries
    const startRow = filteredTotalRows > 0 ? pageIndex * pageSize + 1 : 0;
    const endRow =
        filteredTotalRows > 0
            ? Math.min(startRow + pageSize - 1, filteredTotalRows)
            : 0;

    return (
        <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="place-self-start flex items-center space-x-2">
                <p className="text-nowrap">Rows per page</p>
                <Select
                    name="page_row"
                    onValueChange={(value) => table.setPageSize(Number(value))}
                    value={pageSize}
                >
                    <SelectTrigger id="page_row" className="w-16">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <SelectItem key={pageSize} value={pageSize}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center space-x-4 place-self-end">
                <p className="text-nowrap">
                    Showing <span className="font-semibold">{startRow}</span> to{" "}
                    <span className="font-semibold">{endRow}</span> of{" "}
                    <span className="font-semibold">{filteredTotalRows}</span>{" "}
                    entries
                </p>

                <div className="inline-flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={
                            !table.getCanPreviousPage() ||
                            filteredTotalRows === 0
                        }
                    >
                        <ChevronLeft className="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={
                            !table.getCanNextPage() || filteredTotalRows === 0
                        }
                    >
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
