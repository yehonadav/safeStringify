// safely handles circular references
export const replacer = (cache:Array<any>|null) => (_key:string, value:any) =>
  typeof value === "object" && value !== null
    // @ts-ignore
    ? cache.includes(value)
    ? undefined // Duplicate reference found, discard key
    // @ts-ignore
    : cache.push(value) && value // Store value in our collection
    : value;

const withStringify = (call:(cache:Array<any>, obj:any, ...args:any[])=>string) => {
  return (obj:any, indent?: string | number) => {
    try {
      let cache:Array<any>|null = [];
      const retVal = call(cache, obj, indent);
      cache = null;
      return retVal;
    } catch (e) {
      return obj.toString()
    }
  }
}

export const stringify = withStringify((cache, obj):string => {
  return JSON.stringify(
    obj,
    replacer(cache),
  );
});

export const safeStringify = withStringify((cache, obj:any, indent = 2):string => {
  return JSON.stringify(
    obj,
    replacer(cache),
    indent
  );
});
