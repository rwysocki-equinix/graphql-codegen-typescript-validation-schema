import { buildSchema } from 'graphql';

import { plugin } from '../src/index';

describe('valibot', () => {
  it('non-null and defined', async () => {
    const schema = buildSchema(/* GraphQL */ `
      input PrimitiveInput {
        a: ID!
        b: String!
        c: Boolean!
        d: Int!
        e: Float!
      }
    `);
    const scalars = {
      ID: 'string',
    }
    const result = await plugin(schema, [], { schema: 'valibot', scalars }, {});
    expect(result.content).toMatchInlineSnapshot(`
      "
      export function PrimitiveInputSchema(): v.GenericSchema<PrimitiveInput> {
        return v.object({
          a: v.string(),
          b: v.string(),
          c: v.boolean(),
          d: v.number(),
          e: v.number()
        })
      }
      "
    `);
  })
})
