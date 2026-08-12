import {
  useQuery,
  type DefaultError,
  type QueryFunctionContext,
  type QueryKey,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";

import { useUserStore } from "@/src/lib/stores/userStore";

export interface StudentQueryIdentifiers {
  organisationId: string;
  studentId: string;
}

export type StudentQueryIdentifier = keyof StudentQueryIdentifiers;

export type SelectedStudentQueryIdentifiers<
  TIdentifiers extends readonly StudentQueryIdentifier[],
> = Pick<StudentQueryIdentifiers, TIdentifiers[number]>;

interface StudentQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TIdentifiers extends readonly StudentQueryIdentifier[],
> extends Omit<
    UseQueryOptions<TQueryFnData, TError, TData, QueryKey>,
    "queryFn" | "queryKey"
  > {
  identifiers?: TIdentifiers;
  queryKey: QueryKey;
  queryFn: (
    identifiers: SelectedStudentQueryIdentifiers<TIdentifiers>,
    context: QueryFunctionContext<QueryKey>,
  ) => TQueryFnData | Promise<TQueryFnData>;
}

export const useStudentIdentifiers = <
  const TIdentifiers extends readonly StudentQueryIdentifier[],
>(
  identifierNames: TIdentifiers,
): SelectedStudentQueryIdentifiers<TIdentifiers> => {
  const user = useUserStore((state) => state.user);
  const availableIdentifiers: StudentQueryIdentifiers = {
    organisationId: user?.organisationId ?? "",
    studentId: user?._id ?? "",
  };

  return Object.fromEntries(
    identifierNames.map((identifier) => [
      identifier,
      availableIdentifiers[identifier],
    ]),
  ) as SelectedStudentQueryIdentifiers<TIdentifiers>;
};

export const useStudentQuery = <
  TQueryFnData,
  TError = DefaultError,
  TData = TQueryFnData,
  const TIdentifiers extends readonly StudentQueryIdentifier[] = readonly [],
>({
  identifiers: identifierNames = [] as unknown as TIdentifiers,
  queryKey,
  queryFn,
  enabled = true,
  ...options
}: StudentQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TIdentifiers
>): UseQueryResult<TData, TError> => {
  const identifiers = useStudentIdentifiers(identifierNames);
  const hasRequiredIdentifiers = Object.values(identifiers).every(Boolean);
  const scopedQueryKey = identifierNames.length
    ? [...queryKey, identifiers]
    : queryKey;

  return useQuery<TQueryFnData, TError, TData>({
    ...options,
    queryKey: scopedQueryKey,
    queryFn: (context) => queryFn(identifiers, context),
    enabled: hasRequiredIdentifiers && enabled,
  });
};
