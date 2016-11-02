
# 一道小学几何题
一个简单的练手例子，分别用angular和vue实现了一遍。
demo地址
http://yxzhan.github.io/simpleGeo.

### 公式：
```
//a为边长，d为偏离值
function angle (a, d) {
    return 45 - Math.acos( Math.sqrt(2)/2 + Math.sqrt(2)*d/a ) * (180/Math.PI);
}
```
