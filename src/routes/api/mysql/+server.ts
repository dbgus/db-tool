import { mysqlDriver } from '$lib/db-driver/mysql'

export const GET = async () => {
  const a = await mysqlDriver.query('SELECT * FROM user')
  console.log(a)
  return new Response('hello')
}

export const POST = async (req) => {
  const { query } = await req.request.json()
  const [result, fields] = await mysqlDriver.query(query as string)

  return new Response(
    JSON.stringify({
      result,
      fields: fields.map((x) => ({
        catalog: x.catalog,
        schema: x.schema,
        name: x.name,
        orgName: x.orgName,
        table: x.table,
        orgTable: x.orgTable,
        characterSet: x.characterSet,
        encoding: x.encoding,
        columnLength: x.columnLength,
        type: x.type,
        flags: x.flags,
        decimals: x.decimals,
        typeName: x.typeName,
      })),
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}
