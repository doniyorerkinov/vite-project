import { House, ClipboardList, FileText, Users, Contact } from "lucide-react";

export const links = [
    {
      to: '/',
      label: 'Dashboard',
      Icon: House,
    },
    {
      to: '/menu',
      label: 'Menu',
      Icon: FileText,
    },
    {
      to: '/orders',
      label: 'Orders',
      Icon: ClipboardList,
    },
    {
      to: '/client',
      label: 'Client',
      Icon: Users,
    },
    {
      to: '/employees',
      label: 'Employees',
      Icon: Contact,
    },
  ];