import type { UseFetchOptions } from 'nuxt/app';
import { useFetch } from 'nuxt/app';
import { useRuntimeConfig, computed } from '#imports';

import { useAuthToken } from '~/composables/useAuthToken';

export function useApiService<T>(
  path: string,
  options: UseFetchOptions<T> = {},
) {
  const config = useRuntimeConfig();
  const { token } = useAuthToken();

  const headers = computed(() => {
    let headerObj: Record<string, string> = {};

    headerObj['Accept'] = 'application/json';

    if (token.value) headerObj['Authorization'] = `Bearer ${token.value || ''}`;

    if (options.headers && typeof options.headers === 'object') {
      headerObj = {
        ...headerObj,
        ...(options.headers as Record<string, string>),
      };
    }

    return headerObj;
  });

  const url = `${config.public.api_base_url}${path}`;

  const { headers: _, ...restOptions } = options;

  return useFetch(url, {
    watch: false,
    ...restOptions,
    headers,
  });
}
