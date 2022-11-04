// UTILITIES
function pretty(obj) {
  return JSON.stringify(obj, null, 2);
}
function quickTest(t1, t2, comment) {
  console.assert(t1 === t2, `${comment}failed: ${pretty(t1)} should be equal to ${pretty(t2)}`);
}
function oxfordCommaList(arr) {
  if (arr.length < 3) {
    return arr.join(" and ");
  } else {
    return arr.slice(0, -1).join(", ") + ", and " + arr.slice(-1);
  }
}
quickTest(oxfordCommaList([1, 2]), "1 and 2", `oxfordCommaList() for less than three entries`)
quickTest(oxfordCommaList([1, 2, 3]), "1, 2, and 3", `oxfordCommaList() for more than three entries`)

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

function log(info = "--------------") {
  /*
  console.groupCollapsed("log examples:")
  console.log("log");
  console.debug("debug");
  console.assert(false, "assert");
  console.dir({ fancy: { foo: 1, bar: 2 }});
  console.error("error")
  console.info("info")
  console.profile("profile")
  console.profileEnd("profile") 
  console.table([[1, 2], [3, 4]])
  console.time("time")
  console.timeEnd("time")
  console.timeLog("time")
  console.timeStamp("time stamp")
  console.trace("trace")
  console.warn("warn")
  console.groupEnd()
  */
  if (typeof info === "string") {
    console.info("%c" + info, "color: hsl(158, 50%, 30%)");
  } else {
    console.info(info);
  }
}