## Containers

This folder is for 'containers', which are React components that don't do much else other than contain layout details for the React components in the 'Components' folder that encapsulate various functionalities. 

## Material-UI Design System

### Grid:
The grid creates visual consistency between layouts while allowing flexibility across a wide variety of designs. Material Design’s responsive UI is based on a 12-column grid layout. Use this when you have a 'container' that displays a lot of different 'components'. 

### Box:
A `Box` is a more powerful, convenient, and potential replacement for `div`. Use Box when you want to group several items and control how they look on the page. 

### Container:
A `Container` (not to be confused with 'containers', which is just a name used to communicate a React component's general purpose in the repo) is a basic Material-UI component that centers the content horizontally. It manages the layout of its children, and the only props you should be passing to it are things like `maxWidth` and `fixed`.
