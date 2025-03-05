import { House, ClipboardList, FileText, Users, Contact } from 'lucide-react';
import MenuRightIcon from '../pages/Menu/Widgets/MenuRightIcon';

export const links = [
  {
    to: '/',
    label: 'Dashboard',
    Icon: House,
    hasRightIcon: false,
  },
  {
    to: '/menu',
    label: 'Menu',
    Icon: FileText,
    hasRightIcon: true,
    RightIcon: MenuRightIcon,
  },
  {
    to: '/orders',
    label: 'Orders',
    Icon: ClipboardList,
    hasRightIcon: false,
  },
  {
    to: '/client',
    label: 'Client',
    Icon: Users,
    hasRightIcon: false,
  },
  {
    to: '/employees',
    label: 'Employees',
    Icon: Contact,
    hasRightIcon: false,
  },
];
