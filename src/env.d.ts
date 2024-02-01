/// <reference types="astro/client" />
declare module '*.vue';

interface ImportMetaEnv {
  readonly PUBLIC_API_ORIGIN: string;
}
