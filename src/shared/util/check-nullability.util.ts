/**
 * @param param any string to check if it may be null
 * @returns true if is null, false otherwise
 */
export const checkNullability = (param) => {
  return param != null &&
    param != '' &&
    param != undefined &&
    param != 'null' &&
    param != 'undefined'
    ? isNaN(param)
      ? param
      : +param
    : null;
};

export const checkObjectNullability = (obj: any): boolean => {
  return (
    obj &&
    Object.keys(obj)?.length > 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};

export const checkArrayNullability = (arr: any): boolean => {
  return (
    arr &&
    arr?.length > 0 &&
    Array.isArray(arr) &&
    checkNullability(arr.length > 0 ? arr[0] : arr)
  );
};
