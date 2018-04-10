import { getUser } from './../services/api';

export default {

  namespace: 'app', // 命名空间

  state: { // 初始值
    loadState: false, // 接口loading状态
    toggleMenuFun: '', // 关闭打开菜单的方法
    collapsed: false, // 菜单收缩状态
  },

  subscriptions: { // 监听数据
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: { // 异步处理
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    *getUser ({ payload }, { call, put }) {
      const res = yield call(getUser, payload);
      yield put({ type: 'save', payload: res })
    }
  },

  reducers: {// 同步处理
    save (state, action) {
      return { ...state, ...action.payload };
    }
  },

};
