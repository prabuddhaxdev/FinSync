"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault();

    if (isDefault) {
      toast.warning("You need at least 1 default account");
      return;
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
    <Card
      className="
        h-48 flex flex-col justify-between
        hover:shadow-lg hover:-translate-y-1 transition-all duration-200
        bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        rounded-2xl
      "
    >
      <Link href={`/account/${id}`} className="flex flex-col h-full">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-5">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {type.charAt(0) + type.slice(1).toLowerCase()} Account
            </p>
            <CardTitle className="text-base font-semibold capitalize text-zinc-800 dark:text-zinc-100">
              {name}
            </CardTitle>
          </div>

          <Switch
            checked={isDefault}
            onClick={handleDefaultChange}
            disabled={updateDefaultLoading}
          />
        </CardHeader>

        {/* Content */}
        <CardContent className="px-5 pb-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="text-2xl sm:text-3xl font-semibold">
              ${parseFloat(balance).toFixed(2)}
            </div>
          </div>

          <div className="h-4">
            {isDefault && (
              <span className="text-xs text-green-500">✦ Default Account</span>
            )}
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="px-5 pb-2 flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            Income
          </div>

          <div className="flex items-center">
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
