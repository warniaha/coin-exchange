// copied from https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
export function uniqueByKeepFirst(list, key) {
    var keys = new Set();
    if (list) {
        return list.filter(item => {
            const itemKey = key(item)
            if (keys.has(itemKey)) {
                return false; // key was already added
            }
            else {
                keys.add(itemKey);  // add the key to the set
                return item;
            }
        });
    }
    return list;
}

