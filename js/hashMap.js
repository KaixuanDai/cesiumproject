Dituhui={},Dituhui.HashMap=function(){this.size=0,this.entry=new Object},Dituhui.HashMap.prototype={put:function(t,n){this.containsKey(t)||this.size++,this.entry[t]=n},get:function(t){return this.containsKey(t)?this.entry[t]:null},remove:function(t){this.containsKey(t)&&delete this.entry[t]&&this.size--},containsKey:function(t){return t in this.entry},containsValue:function(t){for(var n in this.entry)if(this.entry[n]==t)return!0;return!1},size:function(){return this.size},clear:function(){this.size=0,this.entry=new Object},values:function(){var t=new Array;for(var n in this.entry)t.push(this.entry[n]);return t}};