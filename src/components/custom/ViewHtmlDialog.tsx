import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ViewHtmlDialogProps } from "@/lib/dto";
import { Button } from "../ui/button";

export default function ViewHtmlDialog({
  openDialog,
  htmlCode,
  closeDialog,
}: ViewHtmlDialogProps) {
  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>HTML Code Preview</DialogTitle>
          <DialogDescription className="text-sm">
            This is the generated HTML code for your email template
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-auto">
          <pre className="text-xs whitespace-pre-wrap break-all">
            {htmlCode}
          </pre>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={closeDialog}>
            Close
          </Button>
          <Button
            onClick={() => {
              if (htmlCode) {
                navigator.clipboard.writeText(htmlCode);
              }
            }}
          >
            Copy to Clipboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
