
# Inventory Management System Front-End

## Tutorial
```bash
npm install
npm run dev
or
node server.js (https)
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[Demo](https://ims-duno.vercel.app/) (dev)

## Tech Stack
* [Next.js](https://nextjs.org/)
* [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
* [IMS API V1](https://servicepadportal.atlassian.net/wiki/spaces/SP/pages/459538444/Inventory+API+V1)

## Scheme
- Components
    - atoms
        - breadCrumbs
        - theme buttons
        - core inputs
    - molecules
        - inputs (color,date,enum,file,gallery)
        - multi inputs (measure,radio select,custom fields)
        - standard modal
        - standard dropdown
    - organisms
        - unit
            - summary
            - error block
    - templates
        - forms
            - unit
                - index
                - form
                - custom
            - custom
    - layouts
        - layout
        - footer
- Pages
    - unit
        - add
        - [id]
    - inventory (units)
    - dashboard
- Scripts
    - helpers
        - stringHelper
        - dateHelper
        - mathHelper
        - useHooksHelper
        - devHelper
        - validationHelper
    - types
        - unit
- Styles
    - reset
    - css.css
    - ims-theme
