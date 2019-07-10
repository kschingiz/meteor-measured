const fromEntries = arr => Object.assign({}, ...Array.from(arr, ([k, v]) => ({ [k]: v })));

export function getObject(mapOrObject) {
  if (mapOrObject instanceof Map) {
    return fromEntries(mapOrObject);
  }
  return mapOrObject || {};
}

export function getArray(arrayOrSet) {
  if (arrayOrSet instanceof Set) {
    return Array.from(arrayOrSet.values());
  }
  return arrayOrSet || [];
}
