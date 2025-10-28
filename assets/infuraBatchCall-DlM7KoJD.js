import { a as i, h as n } from "./wagmi-core-DTeud8oQ.js";
import { b as a } from "./index-DvxBwW7y.js";
import "./ui-MMcbxhMf.js";
import "./vendor-DPXOSdqi.js";
const r = {};
let t = null;
function s() {
  if (!t) {
    const e =
      r?.VITE_BASE_RPC_URL ||
      "https://bsc-mainnet.infura.io/v3/d2ea31ea15274181a6181dc2e99cd4d6";
    t = i({ chain: a, transport: n(e, { batch: !0 }) });
  }
  return t;
}
export { s as getPublicClient };
//# sourceMappingURL=infuraBatchCall-DlM7KoJD.js.map
