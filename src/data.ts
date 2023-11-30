import { LiaWineBottleSolid } from 'react-icons/lia';
import { RiFilePaper2Line } from 'react-icons/ri';
import { FaComputer } from 'react-icons/fa6';
import { NAVIGATION_ROUTES } from './routes/routes.constant';

// NAVBAR
export const NAVBAR_LINKS = [
  { title: 'Home', to: NAVIGATION_ROUTES.BASE },
  { title: 'About Us', to: NAVIGATION_ROUTES.ABOUT_US },
  { title: 'What we buy', to: NAVIGATION_ROUTES.WHAT_WE_BUY },
  { title: 'How it works', to: NAVIGATION_ROUTES.HOW_IT_WORKS },
  { title: 'Available with us', to: NAVIGATION_ROUTES.AVAILABLE_WITH_US },
  { title: 'Contact', to: NAVIGATION_ROUTES.CONTACT },
  { title: "Admin's Login", to: NAVIGATION_ROUTES.ADMIN_LOGIN },
];

// HOME
export const STATISTICS = [
  {
    id: 1,
    icon: LiaWineBottleSolid,
    material: 'Bottles',
    quantity: 1000,
    unit: 'PCS',
  },
  {
    id: 2,
    icon: RiFilePaper2Line,
    material: 'Papers',
    quantity: 1200,
    unit: 'KGS',
  },
  { id: 3, icon: FaComputer, material: 'Ewaste', quantity: 750, unit: 'PCS' },
];

// FOOTER
export const FOOTER_LINKS = [
  { title: 'About Company', to: NAVIGATION_ROUTES.ABOUT_US },
  { title: 'What we buy', to: NAVIGATION_ROUTES.WHAT_WE_BUY },
  { title: 'How it works', to: NAVIGATION_ROUTES.HOW_IT_WORKS },
  { title: 'Available with use', to: NAVIGATION_ROUTES.AVAILABLE_WITH_US },
  { title: 'Contact us', to: NAVIGATION_ROUTES.CONTACT },
];
