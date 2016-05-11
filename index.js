var t = [];
for (var i = 0; i <= 0xFF; i++) {
  t.push((i <= 0xF ? '0' : '') + i.toString(16))
}
module.exports = function() {
  var A = Math.random()*0xffffffff, B = Math.random()*0xffffffff,
      C = Math.random()*0xffffffff, D = Math.random()*0xffffffff;
  return  t[A&0xff] + t[A>>8&0xff] + t[A>>16&0xff] + t[A>>24&0xff] + '-' +
          t[B&0xff] + t[B>>8&0xff] + '-' +
          t[B>>16&0x0f|0x40] + t[B>>24&0xff] + '-' +
          t[C&0x3f|0x80] + t[C>>8&0xff] + '-' +
          t[C>>16&0xff] + t[C>>24&0xff] + t[D&0xff] + t[D>>8&0xff] + t[D>>16&0xff] + t[D>>24&0xff];
}
