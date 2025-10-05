"use client";
import { useInfiniteScroll } from "@workspace/ui/hooks/useInfiniteScroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { PublicFile } from "@workspace/backend/types";
import { UsePaginatedQueryReturnType } from "convex/react";
import { FunctionReference } from "convex/server";
import {  File } from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import TableDropdowns from "../dropdowns/TableDropdowns";
interface FilesTableProps {
  files: UsePaginatedQueryReturnType<
    FunctionReference<
      "query",
      "public",
      {
        category?: string | undefined;
        paginationOpts: {
          id?: number;
          endCursor?: string | null;
          maximumRowsRead?: number;
          maximumBytesRead?: number;
          numItems: number;
          cursor: string | null;
        };
      },
      {
        page: PublicFile[];
        isDone: boolean;
        continueCursor: string;
      },
      string | undefined
    >
  >;
  deleteClick: (file:PublicFile)=>void;
}
const FilesTable = ({ files,deleteClick }: FilesTableProps) => {
    const {
      topElementRef,
      handleLoadMore,
      canLoadMore,
      isLoadingFirstPage,
      isLoadingMore,
    } = useInfiniteScroll({
      status: files.status,
      loadMore: files.loadMore,
      loadSize: 10,
    });
    console.log(files);
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 py-4 ">Name</TableHead>
            <TableHead className="px-6 py-4 ">Type</TableHead>
            <TableHead className="px-6 py-4 ">Size</TableHead>
            <TableHead className="px-6 py-4 ">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(() => {
            if (isLoadingFirstPage) {
              return (
                <TableRow>
                  <TableCell className="h-24 text-center" colSpan={4}>
                    Loading Files...
                  </TableCell>
                </TableRow>
              );
            }
            if (files.results.length === 0) {
              return (
                <TableRow>
                  <TableCell className="h-24 text-center" colSpan={4}>
                    No Files Found
                  </TableCell>
                </TableRow>
              );
            }
            return files.results.map((file) => {
                console.log(file);
                return (
              <TableRow className="hover:bg-muted/50" key={file.id}>
                <TableCell className="px-6 py-4 ">
                  <div className="flex items-center gap-3">
                    <File />
                    {file.name}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 ">
                  <Badge className="uppercase" variant={"outline"}>
                    {file.type}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4  text-muted-foreground">
                  {file.size}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <TableDropdowns file={file} deleteFile={deleteClick} />
                </TableCell>
              </TableRow>
            )});
          })()}
        </TableBody>
      </Table>
      {!isLoadingFirstPage && files.results.length > 0 && (
        <div className="border-t">
          <InfiniteScrollTrigger
            ref={topElementRef}
            canLoadMore={canLoadMore}
            isLoadingMore={isLoadingMore}
            onLoadMore={handleLoadMore}
          />
        </div>
      )}
    </>
  );
};
export default FilesTable;
