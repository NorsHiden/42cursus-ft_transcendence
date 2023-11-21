there’s a problem which is common across all complex apps. State Management, and how to share state across distant components.

consider the following file structure:

components
|---page1Components
        |--Component1
               |---ComponentA
|---page2Component
        |--ComponentB


If some state has to be shared across ComponentA and B in the above example, it will have to be passed through all the intermediate components, and also to any other components who want to interact with the state.

To solve this, their are several solutions which can be used like Redux, Easy-Peasy, and React Context, each of them having their own pros and cons. Generally, React Context should be “good enough” to solve this problem. We store all of the files related to context in contexts.