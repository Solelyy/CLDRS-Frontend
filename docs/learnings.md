## Difference of Next.js and React Router v7

### Next.js
- /app is the routing also called app router. 
- layout.tsx can be included in each route
- in layout.tsx the children is automatically gets injected 
- the root metadata is in layout.tsx

### React Router v7
- /routes folder includes the routing, we can specificy in routes.ts if we want to use the file based routing or by config.
- layout is manually configured also the attaching of children props
- to render nested routes, we must explicitly include <Outlet /> wherever we want them to appear
- in root.tsx it is treated as the entry point of the rr7 app, and this is the only place children gets automatically injected, but also needs <Outlet> in App().
- rr7 does not automatically pass the children of nested routes
- the metadata is in _index.tsx ex: the title of the url that shows in tab.
- it is better to combine or the config way of defining the routes if we have many nested routes, than using flat routing (file based)
- the http request is accessible, by {request}

## Non-null assertion operator (!)
- a typescript operator that fixes the undefined value.
- ex: const cookie = request.headers.get("cookie") || "";
  if (userCache.has(cookie)) return userCache.get(cookie)!;
  - without ! in the end, it will have an error cause it .get() might be undefined. 
  - to handle it, we add ! (just make sure it really exists cause if not it will have a 
  runtime error, since we know it exist by .has() we assure typescript that is why it is ok to put '!')
- if we do not use it, we do this instead: 
    const user = userCache.get("cookie");
    if (user) return user;

## Middleware
- this function runs before the route renders
- we can put the middleware to the layout.tsx to guard our routes
- in rr7, the requst it is automatically given and ready to use, 
ex:
    async function authMiddleware( { request, context }: any ){}
- the request is the GET request made everytime we go to a specific route
- the context is like per request bucket that is provided by React Router for the current route request. it allows middleware and loaders to share data without needing to hit the api multiple times
- middleware is not for returning data to components, it is for guarding routes, preparing shared data (context)
- IMPORTANT: in declaring a middleware, it must be:
export const middleware = [];
- this is the fixed and standard way, and we can include more than one middleware: 
ex:
export const middleware = [authMiddleware, guard1, guard2];

## Loader
- function that runs after middleware
- used for fetching data for the route/component
- it receives { context, params } // or maybe request in some cases
- ex: after setting it: context.set(userContext, user);
- we can use it:
export async function loader({ context }) {
  const user = context.get(userContext);
  return { user };  
}
- loader and middleware is both in the same layout.tsx / guard depends on us
