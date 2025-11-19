import "@tanstack/react-table";

declare module "@tanstack/react-table" {
    interface TableMeta<TData> {
        onEdit?: (row: TData) => void;
        onDelete?: (row: TData) => void;
    }
}
