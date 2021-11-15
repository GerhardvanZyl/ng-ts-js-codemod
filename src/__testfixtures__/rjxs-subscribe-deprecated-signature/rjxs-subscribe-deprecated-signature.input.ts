import { of } from 'rxjs';

// deprecated
of([1, 2, 3]).subscribe(null, null, console.info); // difficult to read
of([1, 2, 3]).subscribe(console.log, console.error, console.info); // difficult to read
of([1, 2, 3]).subscribe((x) => {
    console.log(x);
    console.log('statement 2');
});

of([1, 2, 3]).subscribe((x) => {
    console.log(x);
    console.log('statement 2');
}, (err) => {
    const msg = `Error: ${err}`;
    console.error(msg);
}); // difficult to read

// suggested change
of([1, 2, 3]).subscribe({ complete: console.info });
of([1, 2, 3]).subscribe({ next: console.log, error: console.error, complete: console.info });
