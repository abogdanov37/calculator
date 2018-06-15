function logger (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    let originalMethod = descriptor.value;
    descriptor.value = function(...args) {
        if (args.length > 0) {
            console.log(JSON.stringify(args[0]));
        }
        let returnValue = originalMethod.apply(this, args);
        return returnValue;
    }
};

function inc (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    let originalMethod = descriptor.value;
    descriptor.value = function(...args) {     
        let returnValue = originalMethod.apply(this, args);
        return returnValue + 1;
    }
};

class User {
    private age:number;
    
    @inc
    public getAge():number {
        return this.age;
    }

    @logger
    public setAge(newAge:number):void {
        this.age = newAge;
    }
}

let user = new User();
user.setAge(10);
console.log(user.getAge());