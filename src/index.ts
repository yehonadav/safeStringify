// safely handles circular references
export const safeStringify = (obj:any, indent = 2):string => {
  try {
    let cache:Array<any>|null = [];
    const retVal = JSON.stringify(
      obj,
      (_key, value) =>
        typeof value === "object" && value !== null
          // @ts-ignore
          ? cache.includes(value)
          ? undefined // Duplicate reference found, discard key
          // @ts-ignore
          : cache.push(value) && value // Store value in our collection
          : value,
      indent
    );
    cache = null;
    return retVal;
  } catch (e) {
    return obj.toString()
  }
};
