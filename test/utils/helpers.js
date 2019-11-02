
/**
 * Helper to spy child components in a test.
 *
 * @param name {string}
 * @returns {componentSpy}
 */
export function componentSpyOn (name) {

  function componentSpy ($provide) {
    componentSpy.bindings = [];

    $provide.decorator(name + 'Directive', ($delegate) => {
      let component = $delegate[0];
      component.template = '';
      component.controller = class {
        constructor() {
          componentSpy.bindings.push(this);
        }
      };
      return $delegate;
    });
  }

  return componentSpy;
}

