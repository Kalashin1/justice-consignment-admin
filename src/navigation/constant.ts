export const SCREENS = {
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  CREATE_SHIPMENT: "/creat-shipment",
  SHIPMENTS: "/shipments",
  EDIT_SHIPMENT: (id?: string) => `/shipment/${id ? id : ":id"}`,
  INVOICE: (id?: string) => `/invoice/${id ? id : ":id"}`,
};
