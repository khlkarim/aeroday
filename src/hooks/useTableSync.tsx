"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient, QueryKey } from "@tanstack/react-query";

export interface TableSyncOptions<T> {
    queryKey: QueryKey;
    fetcher: () => Promise<T[]>;
    subscribe?: (onChange: () => void) => () => void;
    enabled?: boolean;
}

export function useTableSync<T>({
    queryKey,
    fetcher,
    subscribe,
    enabled = true,
}: TableSyncOptions<T>) {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey,
        queryFn: fetcher,
        enabled,
    });

    useEffect(() => {
        if (!subscribe) return;

        const unsubscribe = subscribe(() => {
            queryClient.invalidateQueries({ queryKey });
        });

        return unsubscribe;
    }, [queryKey, subscribe, queryClient]);

    return query;
}
