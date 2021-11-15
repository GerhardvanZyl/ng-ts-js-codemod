import { of } from 'rxjs';

// deprecated
of([1, 2, 3]).subscribe({
    next: null,
    error: null,
    complete: console.info
}); // difficult to read
of([1, 2, 3]).subscribe({
    next: console.log,
    error: console.error,
    complete: console.info
}); // difficult to read
of([1, 2, 3]).subscribe((x) => {
    console.log(x);
    console.log('statement 2');
});

of([1, 2, 3]).subscribe({
    next: (x) => {
        console.log(x);
        console.log('statement 2');
    },

    error: (err) => {
        const msg = `Error: ${err}`;
        console.error(msg);
    }
}); // difficult to read

// suggested change
of([1, 2, 3]).subscribe({ complete: console.info });
of([1, 2, 3]).subscribe({ next: console.log, error: console.error, complete: console.info });
