# Notes for Chuggs

I picked up the Insights work while you were recovering. Finished the create and delete
endpoints and hooked them into the frontend. Code was in good shape, easy to
follow, nice work!

## Bugs still open

- Brands are 1-6 but the API validates brand as min(0), so a out of index brand item will render blank in the UI
- The trash and close icons are SVGs with onClick, so you cant use them with a
  keyboard. Ideally we wrap them in buttons to make it semantically correct too
- There are some placeholder error classes to be explicitly handled in the API middleware (e.g OperationError)

## Bigger things to talk about

- Authorisation or authentication, seems to be missing based on the provided product
  requirements. Right now anyone with the URL can read, create and delete insights. We will likely want some seperation and tenancy isolation for creating inisghts vs viewing them. This is a major concern bcause the applications main purpose is collecting and presenting data, data security and integrity is our number 1 concern!
- Logging, error reporting and error classes on the server. At the moment when
  something breaks we just return a generic 500 with no record of it, so in
  production we are be debugging blind. It will make the teams life easier if we add this.
- Security. Specifically input validation on the server (validating fields like
  brand, size limits) and no string injection into queries, use bound parameters.
- Rate limiting, CORS and other API topics will also become important as our application and customers grow. Right now authorisation for creating and deleting insights is the highest priority.

## Anticipated features we will likely need soon

Users will likely want filtering and pagination on the insights list. The
endpoint returns the whole table with no limit right now, so it willl get slow as
the data grows. How might we approach this?

Can you think of any quick wins for insights meta data? for example createdBy, and maybe
device location (assuming the interns are using mobile devices). That kind of
thing would help the data team hugely without making the UX more complicated.

Before building any of this though, its worth a chat with the product owners
about what customers actually want, and with the data team about how the
insights are shaped and what they are planning to add.


Notes: The goal of these notes are talking points to help coach Chuggs towards some of the things he might do better next time. The structure is roughly
- High direction low context. Helps chuggs get some wins under his belt and builds trust and momentum
- High direction, high context. Helps Chuggs become aware of what he did not know, and provides support in solving the problem. Get them engaged with other team members for knowledge sharing
- Goal is to move to low context and low direction where next time Chuggs can be trusted to deliver apps of higher quality in the future