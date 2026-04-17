"use client";

import { useRef, useEffect } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { scanReceipt } from "@/actions/transaction";
import { cn } from "@/lib/utils";

export function ReceiptScanner({ onScanComplete }) {
  const fileInputRef = useRef(null);

  const {
    loading: scanReceiptLoading,
    fn: scanReceiptFn,
    data: scannedData,
  } = useFetch(scanReceipt);

  const handleReceiptScan = async (file) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    await scanReceiptFn(file);

    // 🔥 Important: reset input so same file can be re-selected
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (scannedData && !scanReceiptLoading) {
      onScanComplete(scannedData);
      toast.success("Receipt scanned successfully");
    }
  }, [scanReceiptLoading, scannedData]);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-muted p-4",
        "bg-muted/40",
      )}
    >
      {/* Hidden Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptScan(file);
        }}
      />

      {/* Action Button */}
      <Button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={scanReceiptLoading}
        className={cn(
          "w-full",
          "bg-green-600 hover:bg-green-700 text-white",
          "dark:bg-green-400 dark:text-black dark:hover:bg-green-500",
          "focus-visible:ring-green-600 dark:focus-visible:ring-green-400",
        )}
      >
        {scanReceiptLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Scanning Receipt...
          </>
        ) : (
          <>
            <Camera className="mr-2 h-4 w-4" />
            Scan Receipt with AI
          </>
        )}
      </Button>
    </div>
  );
}
