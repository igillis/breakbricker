// Some helper functions
Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};
Array.prototype.clone = function() {
  return this.slice(0);
};
function vecMul(vec, s) {
  return _.map(vec, function (el) {
    return s * el;
  });
}
function vecAdd(va, vb) {
  if (va.length !== vb.length) {
    throw new Error('cannot add vectors of different length');
  }
  var ret = va.clone();
  for (var i = 0; i < ret.length; i++) {
    ret[i] += vb[i];
  }
  return ret;
}

function vecSub(va, vb) {
  return vecAdd(va, vecMul(vb, -1));
}

function vecDot(va, vb) {
  if (va.length !== vb.length) {
    throw new Error('cannot take the dot product of different size vectors');
  }
  var dot = 0;
  for (var i = 0; i < va.length; i++) {
    dot += va[i] * vb[i];
  }
  return dot;
}

function vecNormalize(v) {
  return vecMul(v, 1 / vecLength(v));
}

function vecLength(v) {
  var d2 = vecDot(v, v);
  return Math.sqrt(d2);
}

function vecDistance(v0, v1) {
  var dv = vecSub(v1, v0);
  return vecLength(dv);
}

function circleSegmentIntersection(center, radius, v0, v1) {
  // project v0 -> center on v0 -> v1
  var seg_dir = vecNormalize(vecSub(v1, v0));
  var projection_length = vecDot(
    vecSub(center, v0),
    seg_dir
  );
  var projection = vecAdd(v0, vecMul(seg_dir, projection_length));

  return vecDistance(center, projection) <= radius;
}
