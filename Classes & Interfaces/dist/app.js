"use strict";
// Interfaces are very similar to custom defined types.
let user1;
user1 = {
    name: "Interface for object",
    age: 30,
    greet(phrase) {
        console.log(phrase + " " + this.name);
    },
};
// a class can have various interfaces
class Person {
    constructor(name) {
        this.name = name;
        this.age = 30;
    }
    greet(phrase) {
        console.log(phrase + " " + this.name);
    }
}
// why we need interface? Here we dont care what prop/methods 'user2' will have
// we just want to make sure that 'user2' contains 'greet'. Hence interface is
// used so as to check that certains features are must present
let user2;
user2 = new Person("JS");
class Person2 {
    // optional
    // age?: number;
    constructor(name, age) {
        this.name = name;
        this.age = age;
        if (age) {
            this.age = age;
        }
    }
    greet(phrase) {
        if (this.age)
            console.log(phrase + " " + this.name + " " + this.age);
        else
            console.log(phrase + " " + this.name);
    }
}
let user3;
user3 = new Person2("Node", 25);
user3.greet("Hello I am");
let add;
add = (n1, n2) => {
    return n1 + n2;
};
