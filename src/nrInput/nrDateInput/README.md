
### `nr-date-input`

Date input element.

#### Example 

Minimal usage in a template:

```html
<nr-date-input
  ng-model="$ctrl.value"
></nr-date-input>
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
<nr-date-input
  label="foo.label"
  ng-model="$ctrl.value"
></nr-date-input>
``` 

By default no label is displayed.
