// UTILITIES
function pretty(obj) {
  return JSON.stringify(obj, null, 2);
}

function copy(obj) { return JSON.parse(JSON.stringify(obj)) }

function assignDown(n, template) {
  let t = copy(template);
  for (const [k1, v1] of Object.entries(t)) {
    for (const [k2, v2] of Object.entries(v1)) {
      n[k1][k2] = v2;
    }
  }
  return n
}

