import { EventEmitter as u } from "events";
import { configure as d, observable as a, autorun as b } from "mobx";
var f;
const c = Symbol("serializeData");
class l extends u {
  constructor() {
    super(...arguments), this[f] = a({});
  }
}
f = c;
const o = Symbol("observableStaticData");
d({
  enforceActions: "never"
});
function E(n, t) {
  if (typeof n == "function")
    n[o] || (n[o] = a({})), n[o][t] = n[t], Object.defineProperty(n, t, {
      get() {
        return n[o][t];
      },
      set(i) {
        const s = n[o];
        s[t] !== i && (s[t] = i);
      }
    });
  else {
    const i = n;
    if (t in n)
      return;
    Object.defineProperty(i, t, {
      get() {
        return this[c][t];
      },
      set(s) {
        const e = this[c];
        e[t] !== s && (e[t] = s);
      }
    });
  }
}
function v(n, t, i) {
  const s = n[t];
  i.value = function(...e) {
    b(() => {
      s.apply(this, e);
    });
  };
}
export {
  l as DPEvent,
  c as SERIALIZE_DATA,
  v as autoUpdate,
  E as observe
};
