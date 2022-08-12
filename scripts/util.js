// UTILITIES
function pretty(obj) {
  return JSON.stringify(obj, null, 2);
}

function copy(obj) { return JSON.parse(JSON.stringify(obj)) }

function assignDown(target, source) {
  // applies the properties from the source to the target, two levels down
  // assumes that the target already has all the keys the source does
  let n = copy(target);
  for (const [k1, v1] of Object.entries(copy(source))) {
    for (const [k2, v2] of Object.entries(v1)) {
      //console.log(`k1:${k1} k2:${k2} v2:${v2}`);
      n[k1][k2] = v2;
    }
  }
  return n
}

