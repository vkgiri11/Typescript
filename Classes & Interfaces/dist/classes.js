"use strict";
// if we have abstract methods in class we need to declare abstract before class keyword
class Department {
    // readonly -> variables can be set only during initialization
    constructor(id, name) {
        this.id = id;
        this.name = name;
        // this.name = n;
        this.employees = [];
    }
    static createEmployee(name) {
        return { name: name };
    }
    // this: Department -> Using this TS exclusive features makes sure
    // describe method can only be called by an object of Department instance
    // describe(this: Department) {
    // 	console.log(`Department ${this.id}: ${this.name} `);
    // 	// ERROR - since 'this' points to methods and properties of class
    // 	// and fiscalYear is static, created without the instance, hence 'this' is not available on it
    // 	// console.log(this.fiscalYear);
    // 	// WORKS FINR
    // 	// console.log(Department.fiscalYear);
    // }
    addEmployees(employee) {
        // this.id = "d3";
        this.employees.push(employee);
    }
    printEmployeesInformation() {
        console.log(this.employees);
    }
}
Department.fiscalYear = 2020;
class ITDepartment extends Department {
    constructor(id, admins) {
        //super -> calls the constructor of the base class
        super(id, "IT");
        //always call super() first before using 'this' of the current class
        this.admins = admins;
    }
    // Every child class should have the implementation of the inherited abstract class
    describe() {
        console.log("IT Department - ID: " + this.id);
    }
}
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, "Accounting");
        this.reports = reports;
        this.lastReport = reports[0];
    }
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        else {
            throw new Error("No report found");
        }
    }
    set mostRecentReport(value) {
        if (!value)
            throw new Error("Please Pass in a valid value");
        else
            this.addReport(value);
    }
    describe() {
        console.log("Accounting Department - ID: " + this.id);
    }
    addEmployees(name) {
        if (name === "Vivek")
            return;
        this.employees.push(name);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReports() {
        console.log(this.reports);
    }
}
class SupportDepartment extends Department {
    constructor(id, reports) {
        super(id, "Accounting");
        this.reports = reports;
        this.lastReport = reports[0];
    }
    static getInstance() {
        // if instance already exists, return exisiting instance of the class
        // this.instance === SupportDepartment.instance
        if (this.instance) {
            return SupportDepartment.instance;
        }
        //else create a new instance and return that
        this.instance = new SupportDepartment("d3", ["Test Support"]);
        return this.instance;
    }
    describe() {
        console.log("Support Department - ID: " + this.id);
    }
}
// ERROR. Since the constructor is private, we cant call 'new' on that. So an instance cant be created
// const support = new SupportDepartment("d2", ["Funds", "Expenses"]);
// A singleton class is configured such that you don't create it with "new" but by calling a method 
// which then ensures that only one instance of the class exists at any given time.
const support1 = SupportDepartment.getInstance();
const support2 = SupportDepartment.getInstance();
// BOTH ARE SAME
console.log(support1, support2);
// an instance of abstract class cannot be created
// const dep = new Department();
// staic methods dont need an instance of class, they can be called directly on the class
// we dont write 'new Department' as when creating new intsance of class
const employee1 = Department.createEmployee("Rohit");
// console.log(employee1, Department.fiscalYear);
const it = new ITDepartment("d1", ["Vivek"]);
it.addEmployees("Raj");
it.addEmployees("Manu");
// it.describe();
// console.log(it);
const accounting = new AccountingDepartment("d2", ["Funds", "Expenses"]);
accounting.addReport("Budget");
accounting.addReport("Compliance");
// getters % setters are properties not functions
accounting.mostRecentReport = "Maintenance";
// console.log(accounting.mostRecentReport);
accounting.addEmployees("Vivek");
accounting.addEmployees("Shan");
// accounting.describe();
// accounting.printReports();
// accounting.printEmployeesInformation();
//describeCopy func points to 'describe' method of department
// const accountingCopy = { describeCopy: accounting.describe };
//when this call is made, accountingCopy has no 'name' variable
// hence 'this.name' doesnt exist
// accountingCopy.describeCopy();
//Now since 'accountingCopy' resembles the department class completely, IT WORKS
// const accountingCopy = { name: "DUMMY", describe: accounting.describe };
// accountingCopy.describe();
