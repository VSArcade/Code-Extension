To get this started, do the following:
At line 125 in src/TextBreadown.ts add in the path of the compiled js file that will hold the script

Make sure to compile the js file into a folder under out/

Then run F5 to compile the typescript and debug the extension
Run Ctrl-Shift-p under the extension host and find under VS Arcade: Text Breakdown

Make sure to open a file before execution

Under the webview files, you can access the given code by doing the following:

```javascript
window.addEventListener("message", (event) => {
    const { data } = event;

    // Now data is of form:
    // {
    //  "msg": { "code": [the actual block of code] }
    // }
})
```