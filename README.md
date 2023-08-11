# @neelsg/components

This is a library of various reusable SvelteKit components used by
Aansit (Pty) Ltd (aansit.com) to develop web based business systems.

## tailwindcss

This library depends on tailwindcss being installed in order for the
styles to display correctly.

In addition, the node module needs to be added to the tailwind
content property:

    // tailwind.config.js

    export default {
      content: [
        './src/**/*.{html,js,svelte,ts}',
        './node_modules/@neelsg/components/dist/**/*.{html,js,svelte,ts}'
      ],
      ...
    };
