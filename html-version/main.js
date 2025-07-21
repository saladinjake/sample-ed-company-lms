// import './public/css/index.css?url';
import { routes } from './AppRoutes';
import { bootstrapContainers } from './src/bootstrap';

const app = document.getElementById('app');

bootstrapContainers(routes).runFramework(app);
