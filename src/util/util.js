class Util {

    static id() {
        return Math.abs(Math.floor(Math.random() * 10000000000000));
    }

    static isPromise(obj) {
        return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
    }

    static isError(e) {
        return e && e.stack && e.message && typeof e.stack === "string" && typeof e.message === "string";
    }
}

module.exports = Util;