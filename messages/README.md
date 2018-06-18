# Aspects implemented successfully:
1. Managed to carry out XHR
2. Used CSS file to style layout of content and username
3. Part 2 - It does not work, and it should not work
4. Part 3 - Loading the JSON data from the URI works 

# Resources used:
1. Piazza was useful - I had the same problem of serving my site up on python, but the webpage did not reflect changes I had made to my lab.js file (I realized this when I opened Chrome developer tools and checked the file code under content)
2. The links you provided
3. https://www.sitepoint.com/working-around-origin-policy/

# Approximate time taken: 2hrs

# Answer to question posed:
- It is possible to request the data from a different origin, but not from your local machine 
- Files from local machine cannot be requested because XHR is for data transfer between web browser and web server, and thus such a request would violate the same origin policy
- For different origin request via URI, the request does not violate the same origin policy because of Cross Origin Resource Sharing. What (I think) happens is that by serving up the site using a python server, you are using a web proxy so that it appears you are exchanging the data with your own server. In reality, in the background, you have accessed data on a new domain from your server.

