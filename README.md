## Inject Tailwind Create-React-App v0.1
Dangerously injects TailwindCSS to a fresh create-react-app project. Currently there are no checks in place to stop it from just injecting where it feels like. Do be careful!

## How to run
Create a react app

```npx create-react-app your-project && cd your-project```

Next run this script.

```npx inject-tailwind-cra```

Then get to work.

### Notes
This app currently installs the built Tailwind file as an appendix to the layout file in the public/index.html. This allows you to globally write tailwindcss in components' className prop. 

Next iterations of this script should include something to at least revert changes if any errors occur.
