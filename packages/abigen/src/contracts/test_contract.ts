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
  approved_account_ids: { [accountId: string]: number } = {};

  constructor(testField: string) {
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
  test_call_method_private1() {
    return {
      someVal: '',
      someValNested: {
        val2: 123,
        val1: '',
      },
    };
  }

  @call({ payableFunction: true })
  test_call_method_private2({ val1 }: { val1: string; val2: number }) {
    return {
      someVal: '',
      someValNested: {
        val2: 123,
        val1: '',
      },
    };
  }

  @view({})
  test_view_method({ a }: { a: string }): { r: number } {
    return { r: 0 };
  }

  @view({})
  test_view_with_class(): SomeClass[] {
    return [new SomeClass('')];
  }

  @view({})
  test_view_with_primitive_return(): string {
    return '';
  }

  @view({})
  test_view_with_primitive_return_arr(): string[] {
    return [];
  }

  @view({})
  test_view_with_primitive_input(t: string) {
    // eslint-disable @typescript-eslint/no-empty-function
  }
}
