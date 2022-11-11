import { NearBindgen, near, call, view, Vector, NearPromise, assert, initialize } from 'near-sdk-js';

export type SomeInnerType = {
  val1: string[];
  val2: number;
};

export type SomeType = {
  someVal?: string[];
  someValNested: SomeInnerType[];
};

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

}
