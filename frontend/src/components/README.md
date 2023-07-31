Components are the life-blood of your application. They will hold the UI for your application, and can sometimes hold the Business Logic and also any State which has to be maintained.

In case a component becomes too complex to express Business Logic with your UI, it is good to be able to split it into a separate bl.tsx (bl = "Business Logic") file, with your root index.tsx importing all of the functions and handlers from it.

It’s also important to limit the scope of a component. a component should only use adapters for data-fetching, have a separate file for complex Business Logic, and only focus on the UI part.