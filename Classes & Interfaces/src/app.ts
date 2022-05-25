// Interfaces are very similar to custom defined types.

// interfaces are blueprint of object
interface Person {
	name: string;
	age: number;

	greet(phrase: string): void;
}

let user1: Person;

user1 = {
	name: "Interface for object",
	age: 30,

	greet(phrase: string) {
		console.log(phrase + " " + this.name);
	},
};

// user1.greet("HI there! I am");

// *************************************************************************

interface Greetable {
	readonly name: string;

	greet(phrase: string): void;
}

// a class can have various interfaces
class Person implements Greetable {
	age = 30;
	constructor(public name: string) {}

	greet(phrase: string) {
		console.log(phrase + " " + this.name);
	}
}

// why we need interface? Here we dont care what prop/methods 'user2' will have
// we just want to make sure that 'user2' contains 'greet'. Hence interface is
// used so as to check that certains features are must present
let user2: Greetable;

user2 = new Person("JS");

// 'name' is readonly in interface, hence the class that implements it
// also has the readonly for 'name'. So, it can't be set once initialized
// user2.name = 'TS'

// user2.greet("HI there! I am");

// *************************************************************************

interface Named {
	readonly name: string;
	// this is optional property, it can or cant be present
	// for methods -> method?() {..}
	outputName?: string;
}

interface Greetable2 extends Named {
	greet(phrase: string): void;
}

class Person2 implements Greetable2 {
	// optional
	// age?: number;
	constructor(public name: string, public age?: number) {
		if (age) {
			this.age = age;
		}
	}

	greet(phrase: string) {
		if (this.age) console.log(phrase + " " + this.name + " " + this.age);
		else console.log(phrase + " " + this.name);
	}
}

let user3: Greetable2;

user3 = new Person2("Node", 25);
user3.greet("Hello I am");

// *************************************************************************

// EXCEPTION - interfaces can be used to define functions also

interface AddFunc {
	(a: number, b: number): number;
}

let add: AddFunc;

add = (n1: number, n2: number) => {
	return n1 + n2;
};
