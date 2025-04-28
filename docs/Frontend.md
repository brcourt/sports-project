# Frontend

I used the following tools to build the UI

- PNPM
- Rspack
- Rsbuild
- Biome
- Mantine Component Library
- Tanstack Query
- React Router
- AmplifyUI

### PNPM

Its much faster than NPM

### Rspack

This is a JS bundler written in RUST. It's about a billion times faster than webpack. I hope I never have to use webpack again. Even better than vite in my opinion.

### Rsbuild

Same deal except this is way better than tsc. I can re-compile in milliseconds so I get to see live changes as I make changes in my code. I don't have to wait that 1-2 seconds for tsc/webpack to do their thing.

### Biome

This is a Rust-based linter for Typescript. Its cleans up the unnecessary cruft of eslint/prettier/Babel which aren't needed anymore because I am using Rsbuild/Rspack. Also, its much less likely that eslint and prettier go to war with each other and throw errors back and forth when I save a file.

### Mantine

I really like this react library. The UI components are fine, however what is really nice about using Mantine are the awesome react hooks that ship with the library. Their form hooks are fantastic.

### Tanstack Query

This library is used to abstract the API in my application and facilitate caching responses so I don't hammer my API unnecessarily. Its very convienent to use, and once setup properly, it makes designing a react application much simpler, because I can also use it as a simple state management system, that also does caching for me. Great for small or simpler projects.

### React router

I had more than one page I wanted to show. Since this is just a demo, I didn't feel the need to go with a fancier routing library.

### AmplifyUI

I wanted to add some simple authentication into the demo, and the easiest way to do this is with the Amplify tools. I don't really like using Amplify at all, but for quick/dirty implementation, its pretty convienent. We hsould rip this out in the future.
