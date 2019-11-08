
### nr-password-input

A checkbox field

#### Example 

Minimal usage in a template:

```html
<nr-checkbox
  ng-model="$ctrl.value"
></nr-checkbox>
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
<nr-password-input
  label="foo.label"
  ng-model="$ctrl.value"
></nr-password-input>
``` 

By default no label is displayed.
