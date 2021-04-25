# safeStringify

Replace ```JSON.stringify``` with ```safeStringify``` to stringify circular objects.  
safely stringify objects to json format  
and discard duplicate references to prevent loops  

## install

```
npm i @yehonadav/safestringify
```

## usage

```typescript
import {safeStringify} from "safestringify"

const a = {};
a.a = a;
a.b = 'b';

console.log(safeStringify(a));
// result:
// {
//   "b": "b"
// }

```

enjoy =)  
