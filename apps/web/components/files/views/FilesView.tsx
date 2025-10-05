"use client"
import { usePaginatedQuery } from "convex/react"
import { api } from "@workspace/backend/_generated/api";
import type { PublicFile } from "@workspace/backend/types";
import FilesTable from "../tables/FilesTable";
import { Button } from "@workspace/ui/components/button";
import { Plus } from "lucide-react";
import UploadDialog from "../dialogs/UploadDialog";
import { useState } from "react";
import DeleteDialog from "../dialogs/DeleteDialog";
const FilesView = () => {
  const files = usePaginatedQuery(
    api.private.queries.files.listFiles,
    {},
    { initialNumItems: 10 }
  );
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedFile, setSetselectedFile] = useState<PublicFile | null>(
    null
  );
  const handleDeleteClick = (file:PublicFile) =>{
    setSetselectedFile(file);
    setDeleteDialogOpen(true);
  }
  const handleFileDeleted = ()=>{
    setSetselectedFile(null);
  }

  return (
    <>
      <UploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        file={selectedFile}
        onDeleted={handleFileDeleted}
      />
      <div className="flex min-h-screen flex-col bg-muted p-8">
        <div className="mx-auto w-full max-w-screen-md">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-4xl">Knowledge Base</h1>
            <p className="text-muted-foreground">
              Upload and manage documents for your AI assistant
            </p>
          </div>
          <div className="mt-8 rounded-lg border bg-background">
            <div className="flex items-center justify-end border-b px-6 py-4">
              <Button onClick={() => setUploadDialogOpen(true)}>
                <Plus />
                Add New
              </Button>
            </div>
            <FilesTable files={files} deleteClick={handleDeleteClick} />
          </div>
        </div>
      </div>
    </>
  );
}
export default FilesView