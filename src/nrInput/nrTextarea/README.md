
### `nr-textarea`

Multi line text input field.

#### Example 

Minimal usage in a template:

```html
<nr-textarea
  ng-model="$ctrl.value"
></nr-textarea>
``` 

Recommended example controller:

```js
class ExampleController {
   
    constructor () {
        
        this._value = undefined;
        
    }
    
    get value () {
        return this._value;
    }
    
    set value (value) {
        this._value = value;        
    }
    
}
``` 

#### Attributes

##### Attribute `label`

This is an optional string to use as a field label. It will be translated, so you should use a translation keyword here.

```html
<nr-textarea
  label="foo.label"
  ng-model="$ctrl.value"
></nr-textarea>
``` 

By default no label is displayed.
