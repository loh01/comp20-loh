# Aspects implemented successfully:
1. Managed to carry out XHR
2. Used CSS file to style layout of content and username
3. Part 2 - It does not work, and it should not work
4. Part 3 - Loading the JSON data from the URI does not works 

# Resources used:
1. Piazza was useful - I had the same problem of serving my site up on python, but the webpage did not reflect changes I had made to my lab.js file (I realized this when I opened Chrome developer tools and checked the file code under content)
2. The links you provided
3. https://www.sitepoint.com/working-around-origin-policy/

# Approximate time taken: 2hrs

# Answer to question posed:
- Files from local machine cannot be requested because such a request would violate the same origin policy.
- For different origin request via URI, the request also violates the same origin policy.
- According to the links, the same origin policy permits scripts running in a browser to only make requests to pages on the same domain. This means that requests must have the same URI scheme, hostname, and port number. It disallows reading remote resources.

