const v={},te=(e,t)=>e===t,M={equals:te};let se=_;const N={},E=1,U=2,J={owned:null,cleanups:null,context:null,owner:null};var p=null;let I=null,c=null,B=null,g=null,A=null,k=0;function q(e,t){const s=c,n=p,i=e.length===0?J:{owned:null,cleanups:null,context:null,owner:t||n};p=i,c=null;try{return K(()=>e(()=>Q(i)),!0)}finally{c=s,p=n}}function ne(e,t){t=t?Object.assign({},M,t):M;const s={value:e,observers:null,observerSlots:null,pending:N,comparator:t.equals||void 0},n=i=>(typeof i=="function"&&(i=i(s.pending!==N?s.pending:s.value)),H(s,i));return[X.bind(s),n]}function F(e,t,s){const n=Y(e,t,!1,E);j(n)}function ie(e,t,s){s=s?Object.assign({},M,s):M;const n=Y(e,t,!0,0);return n.pending=N,n.observers=null,n.observerSlots=null,n.comparator=s.equals||void 0,j(n),X.bind(n)}function le(e){if(B)return e();let t;const s=B=[];try{t=e()}finally{B=null}return K(()=>{for(let n=0;n<s.length;n+=1){const i=s[n];if(i.pending!==N){const o=i.pending;i.pending=N,H(i,o)}}},!1),t}function G(e){let t,s=c;return c=null,t=e(),c=s,t}function fe(e){return p===null||(p.cleanups===null?p.cleanups=[e]:p.cleanups.push(e)),e}function X(){const e=I;if(this.sources&&(this.state||e)){const t=g;g=null,this.state===E||e?j(this):D(this),g=t}if(c){const t=this.observers?this.observers.length:0;c.sources?(c.sources.push(this),c.sourceSlots.push(t)):(c.sources=[this],c.sourceSlots=[t]),this.observers?(this.observers.push(c),this.observerSlots.push(c.sources.length-1)):(this.observers=[c],this.observerSlots=[c.sources.length-1])}return this.value}function H(e,t,s){if(B)return e.pending===N&&B.push(e),e.pending=t,t;if(e.comparator&&e.comparator(e.value,t))return t;let n=!1;return e.value=t,e.observers&&e.observers.length&&K(()=>{for(let i=0;i<e.observers.length;i+=1){const o=e.observers[i];n&&I.disposed.has(o),(n&&!o.tState||!n&&!o.state)&&(o.pure?g.push(o):A.push(o),o.observers&&$(o)),n||(o.state=E)}if(g.length>1e6)throw g=[],new Error},!1),t}function j(e){if(!e.fn)return;Q(e);const t=p,s=c,n=k;c=p=e,oe(e,e.value,n),c=s,p=t}function oe(e,t,s){let n;try{n=e.fn(t)}catch(i){z(i)}(!e.updatedAt||e.updatedAt<=s)&&(e.observers&&e.observers.length?H(e,n):e.value=n,e.updatedAt=s)}function Y(e,t,s,n=E,i){const o={fn:e,state:n,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:p,context:null,pure:s};return p===null||p!==J&&(p.owned?p.owned.push(o):p.owned=[o]),o}function Z(e){const t=I;if(e.state===0||t)return;if(e.state===U||t)return D(e);if(e.suspense&&G(e.suspense.inFallback))return e.suspense.effects.push(e);const s=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<k);)(e.state||t)&&s.push(e);for(let n=s.length-1;n>=0;n--)if(e=s[n],e.state===E||t)j(e);else if(e.state===U||t){const i=g;g=null,D(e,s[0]),g=i}}function K(e,t){if(g)return e();let s=!1;t||(g=[]),A?s=!0:A=[],k++;try{return e()}catch(n){z(n)}finally{re(s)}}function re(e){g&&(_(g),g=null),!e&&(A.length?le(()=>{se(A),A=null}):A=null)}function _(e){for(let t=0;t<e.length;t++)Z(e[t])}function D(e,t){const s=I;e.state=0;for(let n=0;n<e.sources.length;n+=1){const i=e.sources[n];i.sources&&(i.state===E||s?i!==t&&Z(i):(i.state===U||s)&&D(i,t))}}function $(e){const t=I;for(let s=0;s<e.observers.length;s+=1){const n=e.observers[s];(!n.state||t)&&(n.state=U,n.pure?g.push(n):A.push(n),n.observers&&$(n))}}function Q(e){let t;if(e.sources)for(;e.sources.length;){const s=e.sources.pop(),n=e.sourceSlots.pop(),i=s.observers;if(i&&i.length){const o=i.pop(),f=s.observerSlots.pop();n<i.length&&(o.sourceSlots[f]=n,i[n]=o,s.observerSlots[n]=f)}}if(e.owned){for(t=0;t<e.owned.length;t++)Q(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function z(e){throw e}const ue=Symbol("fallback");function V(e){for(let t=0;t<e.length;t++)e[t]()}function ce(e,t,s={}){let n=[],i=[],o=[],f=0,l=t.length>1?[]:null;return fe(()=>V(o)),()=>{let h=e()||[],u,r;return G(()=>{let a=h.length,w,S,T,L,O,b,y,x,m;if(a===0)f!==0&&(V(o),o=[],n=[],i=[],f=0,l&&(l=[])),s.fallback&&(n=[ue],i[0]=q(ee=>(o[0]=ee,s.fallback())),f=1);else if(f===0){for(i=new Array(a),r=0;r<a;r++)n[r]=h[r],i[r]=q(d);f=a}else{for(T=new Array(a),L=new Array(a),l&&(O=new Array(a)),b=0,y=Math.min(f,a);b<y&&n[b]===h[b];b++);for(y=f-1,x=a-1;y>=b&&x>=b&&n[y]===h[x];y--,x--)T[x]=i[y],L[x]=o[y],l&&(O[x]=l[y]);for(w=new Map,S=new Array(x+1),r=x;r>=b;r--)m=h[r],u=w.get(m),S[r]=u===void 0?-1:u,w.set(m,r);for(u=b;u<=y;u++)m=n[u],r=w.get(m),r!==void 0&&r!==-1?(T[r]=i[u],L[r]=o[u],l&&(O[r]=l[u]),r=S[r],w.set(m,r)):o[u]();for(r=b;r<a;r++)r in T?(i[r]=T[r],o[r]=L[r],l&&(l[r]=O[r],l[r](r))):i[r]=q(d);i=i.slice(0,f=a),n=h.slice(0)}return i});function d(a){if(o[r]=a,l){const[w,S]=ne(r);return l[r]=S,t(h[r],w)}return t(h[r])}}}function pe(e,t){return G(()=>e(t))}function ge(e){const t="fallback"in e&&{fallback:()=>e.fallback};return ie(ce(()=>e.each,e.children,t||void 0))}function he(e,t,s){let n=s.length,i=t.length,o=n,f=0,l=0,h=t[i-1].nextSibling,u=null;for(;f<i||l<o;){if(t[f]===s[l]){f++,l++;continue}for(;t[i-1]===s[o-1];)i--,o--;if(i===f){const r=o<n?l?s[l-1].nextSibling:s[o-l]:h;for(;l<o;)e.insertBefore(s[l++],r)}else if(o===l)for(;f<i;)(!u||!u.has(t[f]))&&t[f].remove(),f++;else if(t[f]===s[o-1]&&s[l]===t[i-1]){const r=t[--i].nextSibling;e.insertBefore(s[l++],t[f++].nextSibling),e.insertBefore(s[--o],r),t[i]=s[o]}else{if(!u){u=new Map;let d=l;for(;d<o;)u.set(s[d],d++)}const r=u.get(t[f]);if(r!=null)if(l<r&&r<o){let d=f,a=1,w;for(;++d<i&&d<o&&!((w=u.get(t[d]))==null||w!==r+a);)a++;if(a>r-l){const S=t[f];for(;l<r;)e.insertBefore(s[l++],S)}else e.replaceChild(s[l++],t[f++])}else f++;else t[f++].remove()}}}function de(e,t,s){let n;return q(i=>{n=i,t===document?e():ae(t,e(),t.firstChild?null:void 0,s)}),()=>{n(),t.textContent=""}}function we(e,t,s){const n=document.createElement("template");n.innerHTML=e;let i=n.content.firstChild;return s&&(i=i.firstChild),i}function ae(e,t,s,n){if(s!==void 0&&!n&&(n=[]),typeof t!="function")return P(e,t,n,s);F(i=>P(e,t(),i,s),n)}function P(e,t,s,n,i){for(v.context&&!s&&(s=[...e.childNodes]);typeof s=="function";)s=s();if(t===s)return s;const o=typeof t,f=n!==void 0;if(e=f&&s[0]&&s[0].parentNode||e,o==="string"||o==="number"){if(v.context)return s;if(o==="number"&&(t=t.toString()),f){let l=s[0];l&&l.nodeType===3?l.data=t:l=document.createTextNode(t),s=C(e,s,n,l)}else s!==""&&typeof s=="string"?s=e.firstChild.data=t:s=e.textContent=t}else if(t==null||o==="boolean"){if(v.context)return s;s=C(e,s,n)}else{if(o==="function")return F(()=>{let l=t();for(;typeof l=="function";)l=l();s=P(e,l,s,n)}),()=>s;if(Array.isArray(t)){const l=[];if(R(l,t,i))return F(()=>s=P(e,l,s,n,!0)),()=>s;if(v.context){for(let h=0;h<l.length;h++)if(l[h].parentNode)return s=l}if(l.length===0){if(s=C(e,s,n),f)return s}else Array.isArray(s)?s.length===0?W(e,l,n):he(e,s,l):(s&&C(e),W(e,l));s=l}else if(t instanceof Node){if(v.context&&t.parentNode)return s=f?[t]:t;if(Array.isArray(s)){if(f)return s=C(e,s,n,t);C(e,s,null,t)}else s==null||s===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);s=t}}return s}function R(e,t,s){let n=!1;for(let i=0,o=t.length;i<o;i++){let f=t[i],l;if(f instanceof Node)e.push(f);else if(!(f==null||f===!0||f===!1))if(Array.isArray(f))n=R(e,f)||n;else if((l=typeof f)=="string")e.push(document.createTextNode(f));else if(l==="function")if(s){for(;typeof f=="function";)f=f();n=R(e,Array.isArray(f)?f:[f])||n}else e.push(f),n=!0;else e.push(document.createTextNode(f.toString()))}return n}function W(e,t,s){for(let n=0,i=t.length;n<i;n++)e.insertBefore(t[n],s)}function C(e,t,s,n){if(s===void 0)return e.textContent="";const i=n||document.createTextNode("");if(t.length){let o=!1;for(let f=t.length-1;f>=0;f--){const l=t[f];if(i!==l){const h=l.parentNode===e;!o&&!f?h?e.replaceChild(i,l):e.insertBefore(i,s):h&&l.remove()}else o=!0}}else e.insertBefore(i,s);return[i]}export{ge as F,pe as c,ae as i,de as r,we as t};