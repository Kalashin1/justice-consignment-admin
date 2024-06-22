export const SCREENS = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  SHIPMENTS: '/shipments',
  CREATE_SHIPMENT: '/create-shipment',
  EDIT_SHIPMENT: (id) => `/edit-shipment/${id ? id : ':id'}`,
  INVOICE: (shipment) => `/invoice/${shipment ? shipment : ':id'}`
}