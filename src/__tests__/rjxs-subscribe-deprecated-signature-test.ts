import { defineTest } from 'jscodeshift/src/testUtils';


describe('rjxs-subscribe-deprecated-signature', ()=>{
    defineTest(__dirname, 'rjxs-subscribe-deprecated-signature', null, 'rjxs-subscribe-deprecated-signature/rjxs-subscribe-deprecated-signature', {parser: 'ts'});
});