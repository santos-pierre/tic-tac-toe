export const walkDOM = (el: any, callback: Function) => {
    callback(el);

    el = el.firstElementChild;

    while (el) {
        walkDOM(el, callback);

        el = el.nextElementSibling;
    }
};
