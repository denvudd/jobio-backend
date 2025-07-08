import { Application } from 'src/application';

const application = new Application();

application.init().catch((err) => console.error(err));
