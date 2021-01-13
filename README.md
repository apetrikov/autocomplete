# autocomplete

## Project setup
```
npm run serve
npm run build
npm run test
npm run lint
```

# Why no composition?
In a small sample component we don't need composition API.

# Why data is fetched only at the start?
We don't have requirements for data fetching. After each symbol? After a small pause or 'enter' key?

Since we fetch a small array that updates slowly, let's stop bothering our users with a spinner.
We just load the data once. Reloading the page is easier here.

# Why don't you limit .browserlistrc list?
We can reduce the amount of browsers in the future. E.g. business asks for a smaller bundle or decide to use only Chrome.

# Accessability?
No accessability :)