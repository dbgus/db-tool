import { connectMysql } from '$lib/db-driver/mysql.js'
import type { ConnectionOptions } from 'mysql2'
import * as R from 'ramda'

const requireParam = ['host', 'user', 'password', 'database', 'port']
const pickParams = (url: URL): ConnectionOptions => {
  return R.mergeAll(
    requireParam.map((param) => ({
      [param]: url.searchParams.get(param),
    })),
  )
}
export const GET = async ({ url }) => {
  const query = pickParams(url)
  try {
    await connectMysql(query)
    return new Response(
      JSON.stringify({
        connection: true,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        connection: false,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}

export const POST = async (req) => {
  const { query, ...config } = await req.request.json()
  const mysql = await connectMysql(config).catch(
    (error) =>
      new Response(
        JSON.stringify({
          error: error.message,
          errorNo: error.errno,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          status: 400,
        },
      ),
  )

  //connection error
  if (mysql instanceof Response) return mysql

  try {
    const [result, fields] = await mysql.query(query as string)
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
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.sqlMessage,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 400,
      },
    )
  }
}
