
### nr-checkbox-input

A checkbox field

#### Example 

Minimal usage in a template:

```html
<nr-checkbox-input
  ng-model="$ctrl.value"
></nr-checkbox-input>
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
<nr-checkbox-input
  label="foo.label"
  ng-model="$ctrl.value"
></nr-checkbox-input>
``` 

By default no label is displayed.
