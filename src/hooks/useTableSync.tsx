"use client";

import { useEffect, useRef } from "react";
import { useQuery, useQueryClient, QueryKey } from "@tanstack/react-query";

export interface TableSyncOptions<T> {
    queryKey: QueryKey;
    fetcher: () => Promise<T[]>;
    subscribe?: (onChange: () => void) => () => void;
    enabled?: boolean;
    debounceMs?: number;
}

export function useTableSync<T>({
    queryKey,
    fetcher,
    subscribe,
    enabled = true,
    debounceMs = 200,
}: TableSyncOptions<T>) {
    const queryClient = useQueryClient();
    const query = useQuery({ queryKey, queryFn: fetcher, enabled });

    // Keep latest subscribe in a ref so inline functions don't re-trigger the effect.
    const subscribeRef = useRef(subscribe);
    subscribeRef.current = subscribe;

    const keyHash = JSON.stringify(queryKey);
    const hasSubscribe = !!subscribe;

    useEffect(() => {
        if (!hasSubscribe || !enabled) return;

        let timer: ReturnType<typeof setTimeout>;
        const unsubscribe = subscribeRef.current!(() => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: JSON.parse(keyHash) });
            }, debounceMs);
        });

        return () => {
            clearTimeout(timer);
            unsubscribe();
        };
    }, [keyHash, hasSubscribe, enabled, debounceMs, queryClient]);

    return query;
}