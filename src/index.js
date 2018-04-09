import 'es6-shim';

import dva from 'dva';
import { browserHistory } from 'dva/router'
import createLoading from 'dva-loading';
import './index.scss';

// 为旧版本提供promise polyfill
require('es6-promise').polyfill();

// 1. Initialize
const app = dva({
  history: browserHistory,
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/app').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

export default app._store;