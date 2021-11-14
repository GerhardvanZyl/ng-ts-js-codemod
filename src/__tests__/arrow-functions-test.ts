import { defineTest } from 'jscodeshift/src/testUtils';


describe('arrow-functions', ()=>{
    defineTest(__dirname, 'arrow-functions', null, 'arrow-functions/arrow-functions', {parser: 'ts'});
});