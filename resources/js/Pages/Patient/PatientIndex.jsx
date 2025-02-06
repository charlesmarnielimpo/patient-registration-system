import { useState } from "react";
import { Head } from "@inertiajs/react";
import { PencilLine, Plus, Trash2 } from "lucide-react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useModalForm } from "@/hooks/useModalForm";
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import Pagination from "@/Components/Pagination";
import SearchInput from "@/Components/SearchInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CreatePatientModal from "./Modal/CreatePatientModal";
import EditPatientModal from "./Modal/EditPatientModal";
import DeletePatientModal from "./Modal/DeletePatientModal";
import { FormatLongDate } from "../Utilities/Formatter";

const PatientIndex = ({
    patients,
    prefixes,
    suffixes,
    sexes,
    civilStatuses,
    educationalAttainments,
    bloodTypes,
    employmentStatuses,
}) => {
    const [search, setSearch] = useState("");
    const { formHandler, modal, handleOpenModal, handleCloseModal } =
        useModalForm({
            prefix: "",
            first_name: "",
            middle_name: "",
            last_name: "",
            suffix: "",
            sex: "",
            birth_date: new Date().toISOString().split("T")[0],

            civil_status: "",
            employment_status: "",
            educational_attainment: "",
            blood_type: "",
            mobile_number: "",
            email: "",

            province_code: "",
            province_name: "",
            city_municipality_code: "",
            city_municipality_name: "",
            barangay_code: "",
            barangay_name: "",
            street: "",
            zip_code: "",
        });

    const columns = [
        {
            accessorKey: "complete_name",
            header: "Patient Name",
            cell: ({ cell }) => {
                return <p>{cell.getValue()}</p>;
            },
        },
        {
            accessorKey: "complete_address",
            header: "Address",
            cell: ({ row }) => {
                return <p>{row.original.address?.complete_address}</p>;
            },
        },
        {
            accessorKey: "birth_date",
            header: "Birth Date",
            cell: ({ cell }) => {
                return <p>{FormatLongDate(cell.getValue())}</p>;
            },
        },
        {
            accessorKey: "sex",
            header: "Sex",
            cell: ({ cell }) => {
                return <p>{cell.getValue()}</p>;
            },
        },
        {
            id: "blank",
            header: "",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center justify-end space-x-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() =>
                                            handleOpenModal(
                                                "edit",
                                                row.original
                                            )
                                        }
                                    >
                                        <PencilLine />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Edit Patient</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() =>
                                            handleOpenModal(
                                                "delete",
                                                row.original
                                            )
                                        }
                                    >
                                        <Trash2 />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Delete Patient</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                );
            },
        },
    ];

    const table = useReactTable({
        data: patients,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            globalFilter: search,
        },
        onGlobalFilterChange: setSearch,
        autoResetPageIndex: false,
        globalFilterFn: (row, columnId, value) => {
            const patientName = row.original.complete_name.toLowerCase() || "";
            const sex = row.original.sex.toLowerCase() || "";

            return (
                patientName.includes(value.toLowerCase()) ||
                sex.includes(value.toLowerCase())
            );
        },
    });

    return (
        <AuthenticatedLayout>
            <Head title="Patients" />

            <CreatePatientModal
                handleOpenModal={modal === "create"}
                handleClose={handleCloseModal}
                formHandler={formHandler}
                prefixes={prefixes}
                suffixes={suffixes}
                sexes={sexes}
                civilStatuses={civilStatuses}
                educationalAttainments={educationalAttainments}
                bloodTypes={bloodTypes}
                employmentStatuses={employmentStatuses}
            />

            <EditPatientModal
                handleOpenModal={modal === "edit"}
                handleClose={handleCloseModal}
                formHandler={formHandler}
                prefixes={prefixes}
                suffixes={suffixes}
                sexes={sexes}
                civilStatuses={civilStatuses}
                educationalAttainments={educationalAttainments}
                bloodTypes={bloodTypes}
                employmentStatuses={employmentStatuses}
            />

            <DeletePatientModal
                handleOpenModal={modal === "delete"}
                handleClose={handleCloseModal}
                formHandler={formHandler}
            />

            <div className="min-h-[100vh] flex-1 md:min-h-min flex-col space-y-4">
                <div className="flex items-center space-x-4 justify-between">
                    <SearchInput
                        id="search"
                        name="search"
                        search={search}
                        setSearch={setSearch}
                    />

                    <Button onClick={() => handleOpenModal("create")}>
                        <Plus strokeWidth={3} className="size-4" />
                        <span>Create</span>
                    </Button>
                </div>

                <PatientTable table={table} />

                <Pagination
                    table={table}
                    totalRows={table.getFilteredRowModel().rows.length}
                />
            </div>
        </AuthenticatedLayout>
    );
};

const PatientTable = ({ table }) => {
    const filteredRows = table.getRowModel().rows;

    return (
        <>
            <Card>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.column.columnDef.header}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {filteredRows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan="5" className="text-center">
                                    No results found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredRows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>
        </>
    );
};

export default PatientIndex;
