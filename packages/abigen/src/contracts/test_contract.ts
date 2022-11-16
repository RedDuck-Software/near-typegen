import { NearBindgen, near, call, view, Vector, NearPromise, assert, initialize } from 'near-sdk-js';

export type SomeInnerType = {
  val1: string[];
  val2: number;
};

export type SomeType = {
  someVal?: string[];
  someValNested: SomeInnerType[];
};

export class SomeClass {
  public testField: string;

  constructor(testField: string) {
    this.testField = testField;
  }
}

class NestedClass {
  public field1: string = '';
  public field2: string = '';
}
export class SomeClassWithNesting {
  public testField: NestedClass;

  constructor(testField: NestedClass) {
    this.testField = testField;
  }
}

@NearBindgen({})
export class TestContract {
  @initialize({})
  test_initializer_method({ a }: { a: string }): { r: number } {
    return { r: 0 };
  }

  @call({ privateFunction: true })
  test_call_private() {
    return {
      someVal: '',
      someValNested: {
        val2: 123,
        val1: '',
      },
    };
  }

  @call({ payableFunction: true })
  test_call_payable_with_implicit_return({}: { val1: string; val2: number }) {
    return {
      someVal: '',
      someValNested: {
        val2: 123,
        val1: '',
      },
    };
  }

  @view({})
  test_view_explicit_return({ a }: { a: string }): { r: number } {
    return { r: 0 };
  }

  @view({})
  test_view_implicit_return({ a }: { a: string }) {
    return { r: 0 };
  }

  @view({})
  test_view_return_class(): SomeClass {
    return new SomeClass('');
  }

  @view({})
  test_view_return_class_with_nesting(): SomeClassWithNesting {
    return new SomeClassWithNesting({
      field1: 'some value',
      field2: 'some value'
    });
  }

  @view({})
  test_view_return_class_array(): SomeClass[] {
    return [];
  }

  @view({})
  test_view_with_primitive_return(): string {
    return 'some return value';
  }

  @view({})
  test_view_with_primitive_return_array(): string[] {
    return [];
  }

  @view({})
  test_view_with_return_void() {
    // eslint-disable @typescript-eslint/no-empty-function
  }
}
