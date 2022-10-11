const expect = require('chai').expect;
const mongoose = require('mongoose');
const Employee = require('../employee.model');

describe('Employee', () => {
    it('should throw an error if no arguments', () => {
        const emp = new Employee({});

        emp.validate(err => {
            expect(err.errors).to.exist;
        });

        after(() => {
            mongoose.models = {};
        });
    });

    it('should throw an error if missing arg', () => {
        cases = [{
            firstName: 'John'
        }, {
            lastName: 'Doe'
        }, {
            department: 'IT'
        }, {
            firstName: 'John',
            lastName: 'Doe'
        }, {
            firstName: 'John',
            department: 'IT'
        }, {
            lastName: 'Doe',
            department: 'IT'
        }]

        for (let elm of cases) {
            const emp = new Employee({
                elm
            });

            emp.validate(err => {
                expect(err.errors).to.exist;
            });
        }

        after(() => {
            mongoose.models = {};
        });
    });

    it('should throw an error if args are not a string', () => {
        const cases = [{},
            []
        ];

        for (let elm of cases) {
            const emp = new Employee({
                elm
            });

            emp.validate(err => {
                expect(err.errors).to.exist;
            });
        }
        after(() => {
            mongoose.models = {};
        });

    });

    it('should not throw an error if args are okay', () => {
        emp = new Employee({
            firstName: 'Amanda',
            lastName: 'Doe',
            department: 'IT'
        });
        emp.validate(err => {
            expect(err).to.not.exist;
        });

        after(() => {
            mongoose.models = {};
        });

    })
});