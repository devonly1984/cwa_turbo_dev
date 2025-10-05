"use client"
import type { PublicFile } from "@workspace/backend/types";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { MoreHorizontal, Trash } from "lucide-react";
interface TableDropdownsProps {
  file: PublicFile;
  deleteFile: (file: PublicFile) => void;
}
const TableDropdowns = ({ file,deleteFile }: TableDropdownsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-8 p-0 " size={"sm"} variant={"ghost"}>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => deleteFile(file)}
        >
          <Trash className="size-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default TableDropdowns