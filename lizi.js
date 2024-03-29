window.requestAnimationFrame ||
(window.requestAnimationFrame = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
  || function(a) {
    window.setTimeout(a, 1E3 / 60)
  });

function h(a, b) {
this.set(a, b)
}
h.prototype = {
set: function(a, b) {
  this.x = a || 0;
  this.y = b || 0
},
l: function(a) {
  this.x += a.x;
  this.y += a.y
},
r: function(a) {
  this.x -= a.x;
  this.y -= a.y
},
scale: function(a) {
  this.x *= a;
  this.y *= a
},
t: function() {
  return this.x * this.x + this.y * this.y
},
w: function() {
  return Math.atan2(this.y, this.x)
}
};

function i(a, b, c, d) {
this.a = new h(a, b);
this.d = new h;
this.b = new h;
this.u = c || 1;
this.v = 1 / this.u;
this.j = d || 20;
this.fixed = !1;
this.color = j[Math.floor(Math.random() * j.length)]
}
var j = ["#FD1811", "#F54B45", "#F68D0C", "#ECF00F", "#91C878", "#00B9D2"];
i.prototype = {
update: function() {
  this.fixed || (this.d.scale(this.v), this.b.l(this.d), this.a.l(this.b), this.b.scale(0.9), this.d.set(0, 0))
},
i: function(a) {
  a.save();
  a.translate(this.a.x, this.a.y);
  a.rotate(this.b.w());
  var b = this.b.t();
  a.strokeStyle = "rgba(255,255,255," + (0.02 + Math.min(0.5, b * 8.0E-4)) + ")";
  a.lineWidth = 10 + Math.min(60, b);
  a.beginPath();
  a.arc(0, 0, this.j, 0, Math.PI * 2, !1);
  a.closePath();
  a.stroke();
  a.fillStyle = this.color;
  a.fill();
  a.restore()
}
};

function k(a, b, c, d, f) {
this.f = a;
this.g = b;
this.A = d || 0.1;
this.z = c || 200;
this.n = f || 0.01;
this.e = new h
}
k.prototype = {
update: function() {
  var a = this.f.a.x - this.g.a.x,
    b = this.f.a.y - this.g.a.y,
    c = a * a + b * b;
  if(c > 0.001) {
    var c = Math.sqrt(c),
      d = (c - this.z) * this.A;
    this.e.set(d, d);
    a /= c;
    b /= c;
    this.e.x += this.n * (this.f.b.x - this.g.b.x) * a;
    this.e.y += this.n * (this.f.b.y - this.g.b.y) * b;
    this.e.x *= -a;
    this.e.y *= -b;
    this.f.d.l(this.e);
    this.g.d.r(this.e)
  }
},
i: function(a) {
  a.strokeStyle = "rgba(255,255,255,0.05)";
  a.beginPath();
  a.moveTo(this.f.a.x, this.f.a.y);
  a.lineTo(this.g.a.x, this.g.a.y);
  a.closePath();
  a.stroke()
}
};

function l(a, b, c, d) {
this.k = Math.random() * Math.PI;
this.q = 0.25 + Math.random() * 2.5;
this.p = 0.25 + Math.random() * 1;
i.call(this, a, b, c, d)
}
l.prototype = new i;
l.prototype.B = i.prototype;
l.prototype.update = function() {
this.k += -this.q + Math.random() * this.q * 2;
this.d.x += Math.cos(this.k) * this.p;
this.d.y += Math.sin(this.k) * this.p;
this.B.update.call(this)
};

function m() {
this.c = [];
this.h = [];
this.o = !1;
this.x = Math.random() * window.innerWidth;
this.y = Math.random() * window.innerHeight;
this.color = j[Math.floor(Math.random() * j.length)];
this.m()
}
m.prototype = {
m: function() {
  var a, b, c = 4 + Math.floor(Math.random() * 6);
  for(a = 0; a < c; ++a) b = 2 + Math.random() * 8, a === 0 && (b += Math.random() * 15), b = new l(this.x, this.y, 0.4 + Math.random() * 1.2, b), b.color = this.color, a > 0 && (this.h.push(new k(b, this.c[Math.floor(Math.random() * a)], Math.random() * 20, 0.01 + Math.random() * 0.1, 0.01 + Math.random() * 0.1)), Math.random() < 0.5 && this.h.push(new k(b, this.c[Math.floor(Math.random() * a)], Math.random() * 180))), this.c.push(b)
},
update: function() {
  var a, b, c, d = Number.MAX_VALUE,
    f = Number.MAX_VALUE,
    e = Number.MIN_VALUE,
    g = Number.MIN_VALUE;
  a = 0;
  for(b = this.c.length; a < b; ++a) c = this.c[a], d = Math.min(d, c.a.x + c.j), e = Math.max(d, c.a.x - c.j), f = Math.min(f, c.a.y + c.j), g = Math.max(f, c.a.y - c.j), c.update();
  a = 0;
  for(b = this.h.length; a < b; ++a) this.h[a].update();
  if(e < 0 || d > window.innerWidth || g < 0 || f > window.innerHeight) this.o = !0
},
i: function(a) {
  var b, c;
  b = 0;
  for(c = this.h.length; b < c; ++b) this.h[b].i(a);
  b = 0;
  for(c = this.c.length; b < c; ++b) this.c[b].i(a)
},
s: function() {
  this.h = this.c = null
}
};
(new function() {
function a() {
  var e, g, n = d.length;
  if(f) for(e = 0; e < n; ++e) g = d[e], g.o ? (g.s(), d[e] = new m) : g.update();
  else {
    b.width = b.width;
    c.globalAlpha = 0.8;
    c.globalCompositeOperation = "lighter";
    for(e = 0; e < n; ++e) d[e].i(c)
  }
  f = !f;
  requestAnimationFrame(a)
}
var b = document.getElementById("canvas"),
  c = b.getContext("2d"),
  d = [],
  f = !0;
this.m = function() {
  b.width = window.innerWidth;
  b.height = window.innerHeight;
  for(var c = 0; c < 15; ++c) d.push(new m);
  window.addEventListener("resize", function() {
    b.width = window.innerWidth;
    b.height = window.innerHeight
  }, !1);
  a()
}
}).m();