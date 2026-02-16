import { useAuthToken } from '~/composables/useAuthToken';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const { token } = useAuthToken();

  const api = $fetch.create({
    baseURL: config.public.api_base_url as string,
    headers: {
      Accept: 'application/json',
    },
    onRequest({ options }) {
      console.log('got here!!!!!!');
      if (token.value) {
        const existing = options.headers as HeadersInit | undefined;
        const headers: Record<string, string> =
          existing &&
          typeof existing === 'object' &&
          !(existing instanceof Headers)
            ? { ...(existing as Record<string, string>) }
            : {};
        headers.Authorization = `Bearer ${token.value}`;
        (options as unknown as { headers?: Record<string, string> }).headers =
          headers;
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});
