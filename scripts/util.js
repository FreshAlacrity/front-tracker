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