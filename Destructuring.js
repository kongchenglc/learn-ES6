//变量的解构赋值

//数组解构赋值
    //解构赋值属于模式匹配，按照对应关系对变量赋值
    let [a, b, c] = [1, 2, 3];
    let [foo, [[bar], baz]] = [1, [[2], 3]];
    let [x, ,y] = [1, 2, 3];
    let [head, ...tail] = [1, 2, 3, 4];

    //解构不成功，变量值为undefined
    let [x, y, ...z] = ['a'];

    //不完全解构
    let [x, y] = [1, 2, 3];

    //报错的情况
    //等号右边的值，要么转为对象以后不具备 Iterator 接口（前五个表达式），要么本身就不具备 Iterator 接口（最后一个表达式）。
    let [foo] = 1;
    let [foo] = false;
    let [foo] = NaN;
    let [foo] = undefined;
    let [foo] = null;
    let [foo] = {};

    //set的解构也可以使用解构赋值
    let [x, y, z] = new Set(['a', 'b', 'c']);