const expect = require('chai').expect;
const mongoose = require('mongoose');
const Department = require('../department.model');

describe('Department', () => {
    it('should throw an error if no "name" arg', () => {
        const dep = new Department({}); // create new Department, but don't set `name` attr value

        dep.validate(err => {
            expect(err.errors.name).to.exist;
        });

        after(() => {
            mongoose.models = {};
        });
    });
    it('should throw an error if "name" is not a string', () => {
        const cases = [{},
            []
        ];
        for (let name of cases) {
            const dep = new Department({
                name
            });

            dep.validate(err => {
                expect(err.errors.name).to.exist;
            });
        }
        after(() => {
            mongoose.models = {};
        });
    });
    it('should throw an error if length of name is not between 5 and 20', () => {
        const cases = ['Lore', "lor", 'LoremIpsumLoremIpsumLorem'];
        for (let name of cases) {
            const dep = new Department({
                name
            });

            dep.validate(err => {
                expect(err.errors.name).to.exist;
            });
        }
        after(() => {
            mongoose.models = {};
        });
    });
    it('should not throw an error if "name" is okay', () => {
        const cases = ['Lorem', 'Abcdefg', 'IpsumLorem'];
        for (let name of cases) {
            const dep = new Department({
                name
            });

            dep.validate(err => {
                expect(err).to.not.exist;
            });
        }
        after(() => {
            mongoose.models = {};
        });
    });
});