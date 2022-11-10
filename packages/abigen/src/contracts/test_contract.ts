import { NearBindgen, near, call, view, Vector, NearPromise, assert } from 'near-sdk-js';

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
  @call({ payableFunction: true })
  test_call_method({ val1 }: { val1: string; val2: number }) {
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
