import { getUser } from './../services/api';

export default {

  namespace: 'app', // 命名空间

  state: { // 初始值
    loadState: false
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
      yield put({ type: 'upDateLoignState', payload: res })
    }
  },

  reducers: {// 同步处理
    save (state, action) {
      return { ...state, ...action.payload };
    },

    upDateLoignState (state, { payload }) {
      return {
        ...state,
        isLogin: payload
      }
    }
  },

};
