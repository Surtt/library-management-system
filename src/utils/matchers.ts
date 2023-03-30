export const isPending = (action: { type: string }) => action.type.endsWith('/pending');
export const isRejected = (action: { type: string }) => action.type.endsWith('/rejected');

export const setLoading = (state: { status: string; error: null | string }) => {
  state.status = 'loading';
  state.error = null;
};
export const setRejected = (state: { status: string; error: null | string }) => {
  state.status = 'rejected';
  state.error = 'Cannot load data';
};
