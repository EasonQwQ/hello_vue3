import { getApi, postApi, putApi, deleteApi } from '../request/http';

export const login = async (data) => {
  const res = await postApi('/user/loginByPassword', data);
  return res;
};
export const getUser = async () => {
  const res = await getApi('/user/');
  return res.data;
};
export const getActivities = async () => {
  const res = await getApi('/activity/');
  return res.data;
};

/**
 * 操作活动数据
 * @param {Object} data  数据
 * @param {String} operate 操作方法 update/create
 */
export const operateActivity = async (data, operate) => {
  let res;
  if (operate === 'create') {
    res = await postApi('/activity/', data);
  }
  if (operate === 'update') {
    res = await putApi('/activity/', data);
  }
  return res;
};

export const deleteActivity = async (data) => {
  console.log('data', data);
  const res = await deleteApi('/activity/', { id: data.id });
  return res;
};
