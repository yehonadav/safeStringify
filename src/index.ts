// safely handles circular references
export const replacer = () => {
  const cache:Array<any>|null = [];

  return (_key: string, value: any) =>
    typeof value === "object" && value !== null
      // @ts-ignore
      ? cache.includes(value)
        ? undefined // Duplicate reference found, discard key
        // @ts-ignore
        : cache.push(value) && value // Store value in our collection
      : value;
}

export const replaceErrors = (_key: any, value: any) => {
  if (value instanceof Error) {
    const error: any = {};

    Object.getOwnPropertyNames(value).forEach((propName) => {
      error[propName] = value[propName];
    });

    return error;
  }

  return value;
}

const withStringify = (call:(obj:any, ...args:any[])=>string) => {
  return (obj:any, indent?: string | number) => {
    try {
      return call(obj, indent);
    } catch (e) {
      return obj.toString()
    }
  }
}

export const stringify = withStringify((obj):string => {
  return JSON.stringify(
    obj,
    replacer(),
  );
});

export const safeStringify = withStringify((obj:any, indent = 2):string => {
  return JSON.stringify(
    obj,
    replacer(),
    indent
  );
});

export const stringifyError = withStringify((obj, indent):string => {
  return JSON.stringify(
    obj,
    replacer(),
    indent
  );
});
