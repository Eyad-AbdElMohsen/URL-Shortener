# URL Shortener App

This is starter code for URL Shortener Project.

Fork this repository and use the given files to start with.

## Idea

A URL shortener website is a service that converts long website addresses into shorter, more manageable links. Users input a lengthy URL, and the website generates a condensed version, making it easier to share and remember.

## Interface

The application interface consists of one page which contains:

* A form to shorten the URL, which takes two inputs:
    - the long version of the url
    - the alias of the url (defaults to a random string)
* A table which contains the previously shortened URLs.

## Short URLs

The short URLs are written in this form:

```
http://localhost:3000/{alias}
```

## Application Logic

* When a client tries to access the short URL, they should be redirected to the original long URL.
* If the client accesses a URL which doesn't exist, a `404` error should be displayed.
* There's no required authentication or authorization to generate short URLs.

## Project Criteria

- [ ] The application runs locally without any crashes
- [ ] The application logic is implemented correctly
- [ ] The application uses server-side rendering
- [ ] The application uses a MongoDB database

## Project Evaluation (50 pts.)

* Project Completeness (25 pts.)
* Clean Code and Modulation (15 pts.)
* Descriptive Git Commit Messages (10 pts.)
* Nice touches (5 pts. bonus)