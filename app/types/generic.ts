export type AppRouteId =
  | "home"
  | "products"
  | "sales"
  | "customers"
  | "subscriptions"
  | "settings";

export interface NavMenu {
  title: string;
  id: AppRouteId;
  route: string;
}
