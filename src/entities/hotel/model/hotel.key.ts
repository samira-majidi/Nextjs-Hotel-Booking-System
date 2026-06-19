export const hotelKeys = {
  all: ['hotels'] as const,
  lists: () => [...hotelKeys.all, 'list'] as const,
  list: (params: Record<string, string | string[] | undefined>) => 
    [...hotelKeys.lists(), params] as const,
  details: () => [...hotelKeys.all, 'detail'] as const,
  detail: (id: string | number) => [...hotelKeys.details(), id] as const,
};
