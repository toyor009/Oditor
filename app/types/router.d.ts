import type { AppRouteId } from "~/types/generic";

declare module "vue-router" {
  interface RouteMeta {
    pageId?: AppRouteId;
    pageTitle?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoImage?: string;
  }
}
