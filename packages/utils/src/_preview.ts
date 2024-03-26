// https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof
function isPrimitive(value: any) {
    return value === null || !["object", "function"].includes(typeof value);
}

function equals(value1: any, value2: any) {
    if (isPrimitive(value1) || isPrimitive(value2)) {
        return Object.is(value1, value2);
    }
    const entries1 = Object.entries(value1);
    const entries2 = Object.entries(value2);
    if (entries1.length !== entries2.length) {
        return false;
    }
    for (const [key, value] of entries1) {
        const hasSameProperty =
            entries2.filter((entry) => entry[0] === key).length !== 0;
        if (!hasSameProperty || !equals(value, value2[key])) {
            return false;
        }
    }
    return true;
}

/**
 * 对数组进行去重
 * @param arr 数组
 * @returns 去重后的结果
 */
function uniqueArray(arr: any) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        const item1 = arr[i];
        let isFind = false;
        for (let j = 0; j < result.length; j++) {
            const item2 = result[j];
            if (equals(item1, item2)) {
                isFind = true;
                break;
            }
        }
        if (!isFind) {
            result.push(item1);
        }
    }
    return result;
}

console.log(equals({ a: 1, b: 2, c: 3 }, { b: 2, a: 1 }));
console.log(
    uniqueArray([
        { a: 1, b: 2 },
        { b: 2, a: 1 },
    ])
);
console.log(
    uniqueArray([
        { a: 1, b: undefined },
        { a: 1, c: undefined },
    ])
);

console.log(equals({ a: 1, b: undefined }, { a: 1, c: undefined }));

export { uniqueArray };
