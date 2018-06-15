var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function logger(target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length > 0) {
            console.log(JSON.stringify(args[0]));
        }
        var returnValue = originalMethod.apply(this, args);
        return returnValue;
    };
}
;
function inc(target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var returnValue = originalMethod.apply(this, args);
        return returnValue + 1;
    };
}
;
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.getAge = function () {
        return this.age;
    };
    User.prototype.setAge = function (newAge) {
        this.age = newAge;
    };
    __decorate([
        inc
    ], User.prototype, "getAge", null);
    __decorate([
        logger
    ], User.prototype, "setAge", null);
    return User;
}());
var user = new User();
user.setAge(10);
console.log(user.getAge());
