import { defineTest } from 'jscodeshift/src/testUtils';


describe('sort-methods-properties', ()=>{
    defineTest(__dirname, 'sort-methods-properties', null, 'sort-methods-properties/sort-methods-properties', {parser: 'ts'});
});